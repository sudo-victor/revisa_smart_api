# Revisa Smart API

## Bora Configurar?

1. Clone o projeto:
```
git clone https://github.com/Revisa-Smart/api.git
```

2. Instale as deps:
```
yarn add
```

3. Execute o docker-compose:
```
docker-compose up --build
```

4. Rode as migrações do banco de dados:
```
npx prisma migrate deploy
```

5. Rode o projeto:
```
yarn dev
```