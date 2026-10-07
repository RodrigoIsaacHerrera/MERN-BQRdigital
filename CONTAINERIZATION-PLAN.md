# BQRdigital: containerización y despliegue

**Estado:** imagen Docker local construida, probada y escaneada  
**Actualizado:** 6 de octubre de 2026

Este documento reemplaza el antiguo plan `containerization-plan.copilotmd`, que estaba dentro de `.azure`. Ahora vive en la raíz del repositorio junto al resto de la documentación. Describe el estado comprobado de la containerización y los pasos pendientes para un despliegue alojado; no es una plantilla de infraestructura ni crea recursos en Azure.

## Resumen ejecutivo

BQRdigital es una sola aplicación Node.js: Express entrega la interfaz React compilada y la API protegida de boletos. MongoDB es un servicio separado y persistente; no forma parte de la imagen del aplicativo.

La imagen de producción se genera desde [Dockerfile](./Dockerfile) con Node.js 22 sobre Alpine. La etapa de compilación instala las dependencias de desarrollo, ejecuta las pruebas y genera el bundle del frontend. La etapa final instala solo las dependencias de ejecución, ejecuta como usuario sin privilegios `node` y no incluye npm. El endpoint `/healthz` informa si la conexión a MongoDB está lista.

## Estado actual

### Implementado y verificado

- [Dockerfile](./Dockerfile) multi-stage para compilar y ejecutar la aplicación.
- [.dockerignore](./.dockerignore) para excluir archivos locales, credenciales y artefactos ajenos a la imagen.
- Configuración externa mediante `API_TOKEN`, `MONGODB_URI` y `PORT`.
- Servidor enlazado a `0.0.0.0` para aceptar tráfico dirigido al contenedor.
- Endpoint `/healthz` y healthcheck Docker asociado.
- Pruebas unitarias ejecutadas durante el build de la etapa de compilación.
- Imagen final con dependencias de producción y usuario no-root.
- README y runbook con instrucciones locales y de Docker.

### Resultados de validación local

- `docker build -t mern-bqrdigital:local .` terminó correctamente.
- Las seis pruebas unitarias pasaron durante el build.
- El frontend se compiló con Webpack en modo producción.
- Prueba de ejecución con MongoDB 7 temporal: contenedor `healthy`, página principal `200`, API sin credenciales `401` y API con Bearer válido `200`.
- Docker Scout informó cero vulnerabilidades detectadas en la imagen final escaneada.
- La imagen de prueba fue de aproximadamente 68 MB y configurada con el usuario `node`.

Estos resultados validan la imagen en el entorno local de pruebas. No equivalen a una publicación ni a un despliegue en Azure.

## Arquitectura

```text
Navegador
   │ HTTP (puerto 1989 por defecto)
   ▼
Contenedor BQRdigital
   ├── Express: interfaz estática y API /api/boletos
   ├── /healthz: estado de conexión con MongoDB
   └── React: bundle generado durante el build
          │
          └── MONGODB_URI
                 ▼
          MongoDB externo y persistente
```

El contenedor no debe almacenar los datos de MongoDB en su filesystem. En Docker Desktop, una instancia de MongoDB ejecutándose en el host suele ser accesible con `host.docker.internal`; en una red Docker privada o un servicio alojado, utiliza el nombre DNS o URI correspondiente a esa red.

## Construcción y ejecución

Requisitos: Docker Engine activo y una instancia MongoDB accesible desde el contenedor.

En PowerShell, genera un token, sustituye la URI por la dirección real de MongoDB y ejecuta:

```powershell
$bytes = New-Object byte[] 32
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:API_TOKEN = [BitConverter]::ToString($bytes).Replace("-", "").ToLowerInvariant()
$rng.Dispose()
$env:MONGODB_URI = "mongodb://host.docker.internal:27017/BQRdigital"

docker build -t mern-bqrdigital:local .
docker run --name bqrdigital `
  -p 1989:1989 `
  -e API_TOKEN=$env:API_TOKEN `
  -e MONGODB_URI=$env:MONGODB_URI `
  mern-bqrdigital:local
```

No incluyas el valor real de `API_TOKEN`, una contraseña ni una URI con credenciales en el repositorio, la imagen o los logs. En entornos alojados, suministra las credenciales con el gestor de secretos de la plataforma.

Comprobaciones desde otro terminal:

```powershell
docker inspect --format='{{.State.Health.Status}}' bqrdigital
Invoke-WebRequest -UseBasicParsing http://localhost:1989/healthz
Invoke-WebRequest -UseBasicParsing http://localhost:1989/api/boletos
Invoke-WebRequest -UseBasicParsing http://localhost:1989/api/boletos `
  -Headers @{ Authorization = "Bearer $env:API_TOKEN" }
```

El healthcheck debe quedar `healthy`; `/healthz` responde `200` cuando MongoDB está conectado. La API sin token debe responder `401`; con el token correcto, `GET /api/boletos` debe responder correctamente. Para detener y eliminar el contenedor local:

```powershell
docker rm -f bqrdigital
```

Para ejecutar las pruebas sin construir una imagen: `npm test`. Para generar el bundle local: `npm run build`. Consulta [RUNBOOK.md](./RUNBOOK.md) para el procedimiento operativo completo.

## Configuración de ejecución

| Variable | Obligatoria para desplegar en contenedor | Valor predeterminado | Uso |
| --- | --- | --- | --- |
| `API_TOKEN` | Sí | Ninguno | Token Bearer compartido exigido por todos los endpoints de boletos. |
| `MONGODB_URI` | Sí, salvo que MongoDB esté accesible en el valor local predeterminado | `mongodb://127.0.0.1:27017/BQRdigital` | URI de conexión a MongoDB. El `localhost` predeterminado normalmente no apunta al host ni a otro contenedor. |
| `PORT` | No | `1989` | Puerto HTTP interno de Express. Si se modifica, configura el puerto del contenedor y el mapeo de puertos de forma consistente; la imagen declara `1989` como puerto predeterminado. |

La configuración de Express y el endpoint de salud están en [src/indexserver.js](./src/indexserver.js); la conexión Mongoose está en [src/database.js](./src/database.js).

## Pendiente antes de un despliegue público

1. Elegir el destino y aprovisionar o seleccionar una base MongoDB con persistencia, copias de seguridad y reglas de red apropiadas.
2. Publicar la imagen en un registro de contenedores y desplegarla en el servicio seleccionado (por ejemplo, Azure Container Apps o AKS). **Actualmente el proyecto no contiene archivos IaC, manifiestos Kubernetes ni configuración Azure de despliegue.**
3. Configurar el puerto de entrada `1989`, HTTPS y los valores secretos `API_TOKEN` y `MONGODB_URI` en el entorno de destino.
4. Confirmar que el entorno de alojamiento puede resolver y alcanzar MongoDB y que el healthcheck se usa como verificación de disponibilidad.
5. Decidir cómo validar boletos mediante QR. Los QR actuales abren `/api/boletos/:id`, que exige el Bearer token; una cámara normal no adjunta ese encabezado. No publiques el token en el QR. Para validación pública, diseñar un flujo de verificación específico y seguro antes del lanzamiento.
6. Considerar que la página obtiene recursos de Materialize y fuentes desde CDNs públicos; su disponibilidad depende del acceso externo del navegador.
7. Repetir el escaneo de vulnerabilidades antes de cada publicación. El resultado de cero vulnerabilidades corresponde a la imagen escaneada en la validación local y no garantiza resultados futuros.

## Archivos relacionados

- [README.md](./README.md): descripción y guía rápida del proyecto.
- [RUNBOOK.md](./RUNBOOK.md): pasos de inicio, pruebas y resolución de problemas.
- [Dockerfile](./Dockerfile): receta para construir la imagen.
- [.dockerignore](./.dockerignore): archivos excluidos del contexto Docker.
- [package.json](./package.json) y [package-lock.json](./package-lock.json): scripts y versiones de dependencias.
