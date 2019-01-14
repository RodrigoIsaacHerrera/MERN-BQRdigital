import React,{ Component } from 'react';
import { QRCode } from 'react-qr-svg';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            Empresa:"",
            Asiento:"",
            Origen:"",
            Destino:"",
            Fecha:"",
            Abordaje:"",
            Salida:"",
            Condiciones_Legales:"",
            Cod_QR:"",
            Tarifa:"",
            Boletos:[],
            _id:""
        }
        this.handleChange =this.handleChange.bind(this);
        this.addBoleto = this.addBoleto.bind(this);
    }
    addBoleto(e){
        if(this.state._id){
            fetch(`/api/boletos/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                M.toast({html:'Boleto Modificado'})
                this.setState({
                    Empresa:'',
                    Asiento:'',
                    Origen:'',
                    Destino:'',
                    Fecha:'',
                    Abordaje:'',
                    Salida:'',
                    Condiciones_Legales:'',
                    Cod_QR:'',
                    Tarifa:'',
                    _id:''
                })
                this.getBoletos()
            })

        } else {
            fetch('/api/boletos',{
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
             }
            )
            .then(res=>res.json())
            .catch(err=>console.error(err))
            .then(data=>{
                 console.log(data)
                 M.toast({html:'BOLETO REGISTRADO'})
                 this.setState({
                 Empresa:'',
                 Asiento:'',
                 Origen:'',
                 Destino:'',
                 Fecha:'',
                 Abordaje:'',
                 Salida:'',
                 Condiciones_Legales:'',
                 Cod_QR:'',
                 Tarifa:''
                })
             this.getBoletos()
            })
        }
        e.preventDefault();
    }
    componentDidMount(){
        this.getBoletos();
    }
    getBoletos(){
        fetch('/api/boletos')
            .then(res => res.json())
            .then((data) =>{ 
                this.setState({Boletos:data})
                console.log(this.state.Boletos)
            })
        .catch((e)=>{console.error(e)})
    }
    deleteBoleto(id){
        //console.log('boleto eliminado',id)
        if(confirm('Deseas proceder con Eliminacion?')){
            fetch(`/api/boletos/${id}`,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                        'Content-Type':'application/json',
                }
            })
            .then(data=>{
                console.log(data);
                M.toast({html:'Boleto BQRdigital Eliminado Satisfactoriamente'})
                this.getBoletos()
            })
            .then(res=>res.json())
        }
    }
    editBoleto(id){
        fetch(`/api/boletos/${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                Empresa:data.Empresa,
                Asiento:data.Asiento,
                Origen:data.Origen,
                Destino:data.Destino,
                Fecha:data.Fecha,
                Abordaje:data.Abordaje,
                Salida:data.Salida,
                Condiciones_Legales:data.Condiciones_Legales,
                Cod_QR:data.Cod_QR,
                Tarifa:data.Tarifa,
                _id:data._id
            })
        })
        .catch((e)=>console.log(e));
        //.then((focus())
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({[name]:value})
    }
    render(){
        return(
            <div className="8bc34a light-green">               
                    <nav style={{backgroundColor:'#546e7a'}}> 
                        <div className="nav-wraper">
                                <a href="/" className="brand-logo center-align"style={{marginLeft:20}}>BQRdigital</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="https://www.github.com">GitHub</a></li>
                                    <li><a href="https://reactjs.org">ReactJS</a></li>
                                    <li><a href="https://mongoose.org">Mongoose</a></li>
                                    <li><a href="https://expressjs.com/">Expressjs</a></li>
                                </ul>  
                        </div>
                    </nav>              
                    <div id="descripcion" className="container">    
                        <div className="row">
                            <div className="col s12">
                                <h1 style={{color:'white'}}><b>BQRdigital Travel-Project, para ideas enormes... <br></br><ln>BOLETO DIGITAL CON CÓDIGO QR</ln></b></h1>
                                <br></br>
                                <h3 style={{color:'#311b92'}}>
                                    <line>Sin duda alguna, el transporte de pasajeros, es una de las labores que</line>
                                    <line> carece cada día mas de modernización en la gestión de documentos correspondiente al</line>
                                    <line> servicio de traslado de pasajeros y el control de los abordajes.</line>
                                    <line> Es por ello que BQRdigital desea poder cambiar el mundo para siempre</line>
                                    <line> en la experiencia de usuario que brindan dichas empresas de trasnporte masivo <b>en el proceso de abordaje.</b></line> 
                                </h3> 
                                <br></br>
                                <h3 style={{color:'#311b92'}}>Si eres dueño de una empresa de traslados de pasajeros y le interesa mejorar la expericencia de usuario con:</h3> 
                                <br></br>
                                <ul style={{color:'white'}}>
                                    <li><h3><b>FACEBOOK ING</b></h3></li>
                                    <li><h3><b>GOOGLE V8 SERVER ENGINE</b></h3></li>
                                    <li><h3><b>MONGODB</b></h3></li>
                                </ul>
                                <br></br>
                                <h4 style={{color:'#311b92'}}>solo debes contactarnos... y
                                </h4>
                                <h4 style={{color:'#311b92'}}>SI ERES DESARROLLADOR, PUEDES AYUDARNOS A CAMBIAR EL MUNDO PARA BIEN, ES TOTALMENTE GRATIS WOHOO!!</h4>
                                <br></br>
                                <br></br>
                            </div>
                            <hr></hr>
                            <div className="col s12" >
                                <br></br> 
                                <table style={{backgroundColor:'#6a1b9a'}}>
                                    <thead>
                                        <tr>
                                            <th style={{padding:35,color:'orange'}}><h3><b>IMPACTOS DE ESTE PROYECTO<br></br> AL MUNDO</b></h3></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                           <tr>
                                               <td style={{padding:25,color:'#8bc34a'}}>
                                                   <h4 style={{color:'orange'}}><b>IMPACTO ECOLÓGICO</b></h4>
                                                   <br></br>
                                                   <h5>
                                                        <line>Este proyecto generará cambios <b>positivos para el MUNDO</b></line>
                                                        <line>de forma simple, <b>menos boletos de papel, mas árboles ;)</b></line>
                                                   </h5>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td style={{padding:25,color:'#8bc34a'}}>
                                                   <h4 style={{color:'orange'}}><b>IMPACTO SOCIAL</b></h4>
                                                   <br></br>
                                                   <h5>
                                                        <line>Este impacto en particular es un modo de mejorar algunos hábitos culturales</line>
                                                        <line>introduciendo <b>PUNTUALIDAD, FACILIDAD PARA PLANIFICAR VIAJES Y RESPONSABILIDAD SOCIAL.</b></line>
                                                   </h5>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td style={{padding:25,color:'#8bc34a'}}>
                                                    <h4 style={{color:'orange'}} ><b>IMPACTO EMPRESARIAL Y SISTEMATICO</b></h4>
                                                    <br></br>
                                                    <h5>
                                                        <line>Sin duda para dar una organización y mayor órden que carecen hoy los sistemas de ventas</line>
                                                        <line> de las empresas de buses, es el abordaje en la salida del bus lo cual es incorrecto.</line>
                                                        <line> Es todo un caos, y <b>este proyecto sin este requerimiento de negocio</b></line> 
                                                        <line><b>(definir un tramo de abordaje distinto del de partida o salida)</b></line>
                                                        <line> en su sistema ocacionara que nuestro producto no sea viable de implementar, ademas le permite evitar problemas</line>
                                                        <line> y dicusiones con los usuarios del servicio. En resumen impacta su sitema empresarial, somo agentes del cambio.</line>
                                                    </h5>
                                               </td>
                                           </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="aplicacion" className="container">
                        <div className="row">
                            <div className="col s7">
                                <div className="card">
                                    <div className="card-content">
                                            <h4>Boleto</h4>
                                            <form onSubmit={this.addBoleto}>
                                                <p>Obligatorios (*)</p>
                                                <div className="row">
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Empresa</label>
                                                        <input type="text" name="Empresa" value={this.state.Empresa} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Asiento</label>
                                                        <input type="text" name="Asiento" value={this.state.Asiento} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Origen</label>
                                                        <input type="text" name="Origen"  value={this.state.Origen} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Destino</label>
                                                        <input type="text" name="Destino" value={this.state.Destino} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Fecha</label>
                                                        <input type="text" name="Fecha" value={this.state.Fecha} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Abordaje</label>
                                                        <input type="text" name="Abordaje" value={this.state.Abordaje} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Salida</label>
                                                        <input type="text" name="Salida" value={this.state.Salida} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12">
                                                        <label>Tarifa</label>
                                                        <input type="text" name="Tarifa" value={this.state.Tarifa} onChange={this.handleChange} placeholder="(*)"></input>
                                                    </div>
                                                    <br></br>
                                                    <div className="input field col s12" >
                                                        <label>Condiciones Legales Boleto</label>
                                                        <textarea  name="Condiciones_Legales" value={this.state.Condiciones_Legales} onChange={this.handleChange} placeholder="(*)" className="materialize-textarea"></textarea>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-light darken-4 pulse">
                                                    <b>Simular</b>&nbsp;<sub><i className='material-icons'>save</i></sub>
                                                </button>
                                            </form>
                                    </div>
                                </div>
                            </div>
                            <div id="BQRdigital_boleto">
                                {
                                    this.state.Boletos.map(BQRdigital =>{
                                        return(
                                            <div className="col s12" key={BQRdigital._id}>
                                                <div className="card blue-grey darken-1">
                                                        <div 
                                                        className="card-content white-text" 
                                                        
                                                    >
                                                        <span className="card-title" style={{color:'yellow'}} ><b>BQRdigital</b></span>
                                                        <br></br>
                                                        <br></br>
                                                        <QRCode
                                                            bgColor="#FFFFFF"
                                                            fgColor="#000000"
                                                            level="L"
                                                            style={{ width: 250}}
                                                            value={`http://10.251.192.148:1989/api/boletos/${BQRdigital._id}`}
                                                        />
                                                        <br></br>
                                                        <br></br>
                                                        <p>
                                                            Fecha:&nbsp;&nbsp; {BQRdigital.Fecha}                                           
                                                        </p>
                                                        <br></br>
                                                        <p>
                                                            <b>Horario Abordaje:</b> &nbsp;&nbsp; {BQRdigital.Abordaje}                                           
                                                        </p>
                                                        <br></br>
                                                        <p>
                                                            Origen:&nbsp;&nbsp; {BQRdigital.Origen}                                           
                                                        </p>
                                                        <br></br>
                                                        <p>
                                                            Destino:&nbsp;&nbsp; {BQRdigital.Destino}                                           
                                                        </p>
                                                        <br></br>
                                                        <p>
                                                            Salida:&nbsp;&nbsp; {BQRdigital.Salida}                                           
                                                        </p>
                                                        <br></br>
                                                        <p>
                                                            Tarifa:&nbsp;&nbsp; {BQRdigital.Tarifa}                                           
                                                        </p>
                                                        <br></br> 
                                                        <p style={{color:'#40ff00'}}> 
                                                            <b>Coondiciones Legales Servicio de Transportes<br></br><br></br>{BQRdigital.Condiciones_Legales}</b>
                                                        </p>                                                   
                                                    </div>
                                                        <div className="card-action">
                                                        <button className='btn btn-light darken-4'onClick={()=>this.deleteBoleto(BQRdigital._id)} style={{marginTop:'15px',position:'right'}}><b>Eliminar</b> &nbsp;<sub><i className='material-icons'>delete</i></sub></button>           
                                                        &nbsp;&nbsp;&nbsp;&nbsp;<button className='btn btn-light darken-4' onClick={()=>this.editBoleto(BQRdigital._id)} style={{marginTop:'15px',position:'right'}}><b>Modificar</b> &nbsp;<sub><i className='material-icons'>edit</i></sub></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>                 
                    <footer className="page-footer" style={{backgroundColor:'#546e7a'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col l6 s12">
                                    <h5 className="white-text">BQRdigital is powered by</h5>
                                    <p className="grey-text text-lighten-4">all love of the world.</p>
                                </div>
                                <div className="col l4 offset-l2 s12">
                                   
                                </div>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <div className="container">
                                 © 2018 MERN-VAP-PROJECT
                                <a className="grey-text text-lighten-4 right" href="https://www.linkedin.com/in/rodrigoisaach86534b13b/">Rodrigo Herrera Beiza</a>
                            </div>
                        </div>
                    </footer>
            </div>    
        )
    }
}
export default App;
