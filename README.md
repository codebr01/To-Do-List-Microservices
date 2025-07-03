# To-Do-List-Microservices

Esse projeto foi desenvolvido para dar início aos meus estudos sobre Microservices, onde foi criado um To-Do List como sistema base para desenvolver um projeto com arquitetura de Microservices. Foram feitos dois serviços - **Autenticação** e **Tarefas**.

### Tecnologias Usadas

- **Autenticação**: NodeJS, Express, JWT para autenticação, e PostgreSQL.
- **Tarefas**: NodeJS, Express e MongoDB (Mongoose).
- **Comunicação entre os serviços**: RabbitMQ, onde o serviço de Tarefas envia mensagens para o serviço de Autenticação para verificar se o token fornecido é válido.

### Funcionalidades

- **Autenticação JWT** do usuário.
- **Criação**, **atualização**, **listagem** e **remoção** de tarefas.

### Estrutura do Projeto

```plaintext
codebr01-to-do-list-microservices/
├── docker-compose.yml
├── auth/
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   └── src/
│       ├── routes.ts
│       ├── server.ts
│       ├── tokenValidation.ts
│       └── routes/
│           ├── auth-login.ts
│           └── auth-register.ts
└── tasks/
    ├── docker-compose.yml
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── routes.ts
        ├── server.ts
        ├── middlewares/
        │   └── authenticateJWT.ts
        ├── models/
        │   └── task.model.ts
        └── routes/
            ├── create.task.ts
            ├── delete.task.ts
            ├── get.task.ts
            ├── get.tasks.ts
            └── update.task.ts
```

### Como Rodar o Projeto

#### Pré-Requisitos: Docker e NodeJS

#### Rodando Localmente
1. Execute o comando: ```git clone https://github.com/codebr01/To-Do-List-Microservices.git```
2. Depois entre na pasta do projeto ```cd To-Do-List-Microservices```
3. Faça o compose dos serviços: ```docker compose up```
4. Entre na pasta "auth" e execute o comando: ```npm run dev```
5. E por fim, entre na pasta tasks e execute o comando ```npm run dev```

### EndPoints da API

#### Auth 

##### POST auth/login
  
  ```

  {
    "email": "admin@gmail.com",
    "password": "admin"
  }
  
  ```
  
##### POST auth/register

  ```
  {
    "name": "user",
    "password": "user",
    "email": "user@gmail.com"
  }

  ```

#### Tasks 

##### GET /tasks/:userId [Listar tarefas de um usaurio especifico]

##### Bearer Token <token>

##### GET /tasks/:userId/:taskId [Buscar tarefa de um usaurio especifico]

##### POST /tasks/:userId [Criar tarefa de um usaurio especifico]

  ```
    {
      "title": "Teste 4",
      "description": "Description Teste 4"
    }
  ```

##### PUT /tasks/:userId/:taskId [Atualizar tarefa de um usaurio especifico]

  ```
    {
      "title": "FASDMFLKASDHJFASDLKASDJLKDAS",
      "description": "Description 3143432"
    }
  ```
 
##### DELETE /tasks/:userId/:taskId [Deletar tarefa de um usaurio especifico]

### Variáveis de Ambiente

#### - Cria o arquivo .env nas pastas "auth" e "tasks" seguindo o conteudo de ".env.example"
