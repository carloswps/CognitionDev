# v0.8.5 - Hugging Face Optimized
# NOTA: O frontend é pre-buildado pelo GitHub Actions e enviado com client/dist/

FROM node:22-alpine

RUN apk upgrade --no-cache && \
    apk add --no-cache jemalloc python3

ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2
ENV PORT=7860
ENV HOST=0.0.0.0

WORKDIR /app

# Copiar tudo (incluindo client/dist/ já buildado)
COPY . .

# Criar .env vazio e diretórios necessários
RUN touch .env && \
    mkdir -p client/dist client/public/images logs uploads

# Instalar APENAS dependências de produção (frontend já está buildado)
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm ci --no-audit --prefer-offline && \
    npm prune --production && \
    npm cache clean --force

ENV NODE_ENV=production
ENV ALLOW_REGISTRATION=true
ENV ALLOW_UNVERIFIED_EMAIL_LOGIN=true

# Permissões
RUN chmod -R 777 client/public/images logs uploads

EXPOSE 7860

# Criar usuário padrão se não existir, depois iniciar o backend
CMD sh -c "node config/init-user.js && npm run backend"
