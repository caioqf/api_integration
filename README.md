# Integração Google Sheets - CRM HubSpot 

API integrando planilhas do Google Sheets com a API do HubSpot.

A premissa é cadastrar os contatos salvos em uma planilha como contato no SpotHub através da sua API.

# Como rodar

É necessário clonar o repositório 

````
$ git clone https://github.com/caioqf/api_integration
````

entrar na pasta do projeto

````
$ cd api_integration
````

Rodar o comando para instalar as dependências

````
$ npm install
````

e finalmente o comando para subir a API

````
$ npm run start
````

Se tudo correr bem, deve-se esperar um output assim no terminal: 

````
> api_integration@1.0.0 start
> nodemon src/index.js

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
Listening on port 3333
````


# Como usar

## Rotas

### **Importar contatos**
O projeto possue uma rota principal, que é a usada para exportar os contatos em uma planilha para a lista no CRM:

`````
POST /contact/import/:sheetId
`````

Onde sheetID é o ID da planilha com os contatos

----

### **Obter todos contatos**
Rota para obter a relação de todos os contatos cadastrados no CRM

````
GET /contact
````

# Formato da planilha

Para os dados salvos de forma coerente, a planilha deve obedecer o seguinte formato de colunas: 

| Nome da empresa | Nome completo  | Endereço de Email    | Numero do telefone | URL do Website       |
|-----------------|----------------|----------------------|--------------------|----------------------|
| DevAPI          | Fulano Ciclano | fulano@devapi.com.br | 3199999999         | www.fulanodevapi.com |

A1 - Nome da empresa

B1 - Nome completo

C1 - Endereço de Email

D1 - Numero do telefone

E1 - URL do Website

# Testes

Para rodar os testes unitários, rode o comando 

````
$ npm run test
````
