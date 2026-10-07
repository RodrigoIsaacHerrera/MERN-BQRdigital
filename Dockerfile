FROM node:22-alpine AS base

RUN apk upgrade --no-cache

FROM base AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY .babelrc webpack.config.js ./
COPY src ./src
COPY test ./test
RUN npm test
RUN npm run build

FROM base AS runtime

ENV NODE_ENV=production \
    PORT=1989

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev \
    && npm cache clean --force \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY src/indexserver.js ./src/indexserver.js
COPY src/database.js ./src/database.js
COPY src/models ./src/models
COPY src/routes ./src/routes
COPY src/middleware ./src/middleware
COPY src/public ./src/public
COPY --from=build /app/src/public/bundle.js ./src/public/bundle.js

USER node

EXPOSE 1989

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 1989) + '/healthz', response => process.exit(response.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/indexserver.js"]
