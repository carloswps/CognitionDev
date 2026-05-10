# v0.8.5 - Hugging Face Optimized

FROM node:22-alpine

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

# Aumentar limite de memória para builds grandes
ENV NODE_OPTIONS=--max-old-space-size=12288

# Buildar packages necessários para o backend
RUN npm run build:data-schemas && npm run build:api

# Buildar frontend com otimizações para CI (menor uso de memória)
RUN npm run build:data-provider && npm run build:client-package && cd client && npm run build:ci

# Limpar e setar produção
RUN npm prune --production && \
    npm cache clean --force

ENV NODE_ENV=production
ENV ALLOW_REGISTRATION=true
ENV ALLOW_UNVERIFIED_EMAIL_LOGIN=true

# Permissões
RUN chmod -R 777 client/public/images logs uploads

EXPOSE 7860

# Criar usuário padrão se não existir, depois iniciar o backend
CMD sh -c "node config/init-user.js && npm run backend"
