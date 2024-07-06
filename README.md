# timerActivities-frontEnd

FRONT-END  para gerenciar e cronometrar tarefas acessando API PYTHON, FLASK , SQLITE e SWAGGER .

Acesse aqui o github com a API e backend da aplicação : https://github.com/morettonijose/timerActivities-API


## 0. Preparação do Backend e API 

0.1 ) Instale e inicie a instância da api e  backend seguindo os passos do repositório a seguir : **https://github.com/morettonijose/timerActivities-API/**

0.2 ) Certifique-se que sua instância de servidor backend e api está ativa, acessando no navegador o seguinte link :  **http://127.0.0.1:5000/swagger/**



## 1. Instalação do Front-end: clone o repositório

```bash
git clone https://github.com/morettonijose/timerActivities-frontEnd.git seu-repositorio-front
cd seu-repositorio-front
```

Agora basta escolher a stack para rodar seu servidor WEB de front-end. 

Disponibilizei 2 opções pre-configuradas que você pode usar facilmente.

Você pode escolher entre **PYTHON + Flask** ou  **NODE.JS + Express.js**.

Escolha de acordo com sua preferência e siga o **passo 2 ** da stack escolhida   : 

## 2. Instalação servidor web em Python + FLASK

Primeiro, certifique-se de ter  python instalado. 

#### WINDOWS / LINUX
```bash
python --version
```

#### MACOS
```bash
python3 --version
```

### 2.1. Instalação do Flask
Uma vez que o python está instalado, adicione a biblioteca Flask para criar rapidamente um servidor web. 

#### WINDOWS / LINUX
```bash
pip install Flask
```
#### MACOS
```bash
pip3 install Flask
```


### 2.2. Iniciar a instância do servidor web para acessar seu front end

#### WINDOWS / LINUX
```bash
python server.py
```

#### MACOS
```bash
python3 --version
``` 
 
## 3. Pronto! 
Você já pode acessar o front-end no navegador web. Acesse o link a seguir : 

**http://127.0.0.1:8100/**




## 2. Instalação servidor web em node.js + Express.js

Se preferir a alternativa de configurar seu front-end em node.js siga os procedimentos abaixo  : 

Primeiro, certifique-se de ter o Node.js instalado. Você pode baixá-lo e instalá-lo a partir do site oficial do Node.js no link a seguir :

https://nodejs.org/pt

Uma vez que o node está instalado, realize o seguinte procedimento : 
```bash
npm init -y
```

### 2.1 Instalação do Express.js 
Na sequência, instale o framework Express.js para criar rapidamente um servidor web. 
```bash
npm install express
```


### 2.2. Iniciar a instância do servidor web para acessar seu front end
```bash
node server.js
```


## 3. Pronto! 
Você já pode acessar o front-end no navegador web. Acesse o link a seguir : 

**http://localhost:8100**

