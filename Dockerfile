# v0.8.5 - Hugging Face Optimized

FROM node:20-alpine

RUN apk upgrade --no-cache && \
    apk add --no-cache jemalloc python3

ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2
ENV PORT=7860
ENV HOST=0.0.0.0

WORKDIR /app

# Copiar tudo
COPY . .

# Criar .env vazio e diretórios necessários
RUN touch .env && \
    mkdir -p client/dist client/public/images logs uploads

# Instalar TODAS as dependências (incluindo devDependencies para build)
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm ci --no-audit --prefer-offline

# Buildar packages internos (necessários para o backend)
RUN npm run build:data-provider && \
    npm run build:data-schemas && \
    npm run build:api

# Buildar frontend com menos memória (evitar OOM)
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run frontend:ci || \
    (echo "Frontend build falhou, criando pagina minima..." && \
     mkdir -p client/dist && \
     echo '<!DOCTYPE html><html><head><title>CognitionDev</title></head><body><h1>CognitionDev API</h1><p>Frontend em construcao</p></body></html>' > client/dist/index.html)

# Limpar e setar produção
RUN npm prune --production && \
    npm cache clean --force

ENV NODE_ENV=production

# Permissões
RUN chmod -R 777 client/public/images logs uploads

EXPOSE 7860

CMD ["npm", "run", "backend"]
