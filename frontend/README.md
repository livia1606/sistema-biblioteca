# Sistema de Gerenciamento de Biblioteca

Projeto desenvolvido para a disciplina de Programação Web Back-End da UTFPR.

---

## Integrantes

- Ana Beatriz Barreto Teixeira
- João Miguel Dias Rosa
- Lívia Pontes Argenton
- Raissa Albuquerque Diniz

---

# Tema

Sistema de Gerenciamento de Biblioteca.

O sistema permite o gerenciamento do acervo da biblioteca por meio do cadastro de livros, leitores e empréstimos, oferecendo uma interface simples, organizada e intuitiva.

---

# Tecnologias Utilizadas

## Front-end

- React
- Vite
- Axios
- React Icons
- CSS3
- JavaScript

## Back-end

- Node.js
- Express
- JWT (JSON Web Token)
- Swagger
- Sequelize

## Banco de Dados

- MySQL

---

# Funcionalidades

## Login

- Autenticação utilizando JWT
- Armazenamento do token
- Controle de acesso por perfil

---

## Livros

- Cadastro
- Consulta
- Edição
- Exclusão
- Busca

---

## Leitores

- Cadastro
- Consulta
- Edição
- Exclusão
- Busca

---

## Empréstimos

- Registro de empréstimos
- Registro de devoluções
- Consulta
- Busca

---

# Interface

O sistema possui uma interface moderna, responsiva e intuitiva, desenvolvida com React e CSS, utilizando uma identidade visual inspirada em bibliotecas, com cores suaves e foco na usabilidade.

---

# Estrutura do Projeto

```
sistema-biblioteca/

│

├── frontend/

│   ├── src/

│   ├── assets/

│   ├── components/

│   ├── pages/

│   ├── services/

│   └── styles/

│

├── backend/

│   ├── src/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   ├── swagger/

│   └── server.js

```

---

# Instalação

## 1. Clonar o projeto

```bash
git clone <link-do-repositorio>
```

---

## 2. Instalar dependências

### Front-end

```bash
cd frontend
npm install
```

### Back-end

```bash
cd backend
npm install
```

---

## 3. Configurar o banco

Criar um banco MySQL.

Criar um arquivo `.env` dentro da pasta backend contendo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha

JWT_SECRET=segredo
```

---

## 4. Executar o Back-end

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/api-docs
```

---

## 5. Executar o Front-end

```bash
cd frontend

npm run dev
```

Aplicação:

```
http://localhost:5173
```

---

# Credenciais de acesso

Administrador

```
E-mail:
admin@biblioteca.com

Senha:
123456
```

> **Observação:** As credenciais poderão ser alteradas conforme a configuração do banco de dados.

---

# Vídeo da apresentação

Link:

```
(Adicionar o link do vídeo após a gravação)
```

---



## Universidade Tecnológica Federal do Paraná

Tecnologia em Análise e Desenvolvimento de Sistemas

Projeto acadêmico desenvolvido para fins educacionais.
