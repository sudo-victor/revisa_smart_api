# Estágio de construção
FROM node:20-alpine as builder

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências necessárias para compilação do Prisma e bcrypt
RUN apk add --no-cache make g++ python3

# Copia os arquivos de definição do projeto
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install --frozen-lockfile

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o build do projeto
RUN yarn build

# Gera o cliente do Prisma
RUN npx prisma generate

# Estágio de produção
FROM node:20-alpine as production

# Define o diretório de trabalho
WORKDIR /app

# Instala o cliente global do Prisma
RUN yarn global add @prisma/client

# Copia os arquivos necessários do estágio de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/prisma ./prisma

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para executar a aplicação
CMD ["yarn", "start"]
