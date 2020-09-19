# LABEPHOTO-Backend
Gerenciador de imagens de quadros de artistas

#MODELAGEM MYSQL

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
