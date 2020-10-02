
<h1 align="center">
🎨🎨🎨 Labephoto-Backend - PROJETO FULL STACK
</h1>

<p>
> Status do Projeto: Em desenvolvimento :warning:
</p>

# Indice

- :rocket: [Sobre o Projeto](#rocket-sobre-o-projeto)
- 👨‍💻️ [Tecnogias utilizadas](#%EF%B8%8F-tecnogias-utilizadas)
- 📦️ [Como utilizar o projeto](#%EF%B8%8F-como-utilizar-o-projeto)


---

## :rocket: Sobre o Projeto

 O objetivo do projeto era construir uma plataforma de gerenciamento de imagens, nos caso, mais especificamente, uma galeria de artes. 

Este projeto de Back-end Web foi desenvolvido em Node.js com TS.

---

## 👨‍💻️ Tecnogias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

Node/Typescript
Knex (Query builder e migrations)
JWT (tokens)
Bcrypt (criptografia para senhas)

### Dependências

- [React Router DOM](https://github.com/ReactTraining/react-router#readme)
- :nail_care: [Material UI](https://material-ui.com/)


### IDE

- [Visual Studio Code](https://code.visualstudio.com/)
- Run in Postman

---

### Banco de dados:
-MySQL Workbench



## Iniciando um novo projeto

git clone https://github.com/TatianaFischer/Labephoto-Backend.git
yarn install # ou npm install

node ./init.js

## ENDPOINTS:
POST LOGIN
POST SIGNUP
GET ALL IMAGES
GET DETAILS IMAGES BY ID
POST CREATE IMAGES


## MODELAGEM MYSQL

```
CREATE TABLE Users_img (
 id VARCHAR(255) PRIMARY KEY,
 name VARCHAR(255) NOT NULL ,
 email VARCHAR(255) NOT NULL UNIQUE,
 nickname VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL 
);
```
```
CREATE TABLE IF NOT EXISTS Images_img(
id VARCHAR(255) PRIMARY KEY,
subtitle VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
createdDate DATETIME NOT NULL DEFAULT current_timestamp,
file VARCHAR(255) NOT NULL,
collection VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE Images_tag(
id VARCHAR (255) PRIMARY KEY,
name VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE Images_img_tag(
tags_id VARCHAR (255),
img_id VARCHAR(255),
FOREIGN KEY (img_id) REFERENCES Images_img(id),
FOREIGN KEY (tags_id) REFERENCES Images_tag(id)
);
```
```
//TODAS AS TAGS FORAM ADICIONADAS UMA POR UMA:
INSERT INTO Images_tag (id, name)
VALUES(
  "008", 
  "#ORIENTAL"
 
);
```
