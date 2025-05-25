# 📚 Collectify

Collectify é um aplicativo mobile criado para **gerenciar coleções de quadrinhos**, permitindo aos usuários adicionar, editar e visualizar seus itens de forma organizada e intuitiva.

## 🎯 Objetivo

Oferecer uma solução prática e amigável para colecionadores de quadrinhos registrarem suas edições, com informações como nome, preço, ano e raridade.

---

## 🧱 Tecnologias Utilizadas

### 🖥️ Backend
**Main:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" height="40" alt="java logo"  />
  <img width="12" />
- **Java 21**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL** 
- **RESTful API**

### 📱 Frontend
**Main:**  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
  <img width="12" />, <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="30" alt="react logo"  />
  <img width="12" />
- **React Native com Expo**
- **React Navigation**
- **Axios (para requisições HTTP)**
- **AsyncStorage (para cache local, se necessário)**
- **JavaScript**

---

## 📦 Estrutura do Projeto

```
collectify/
├── backend/ (Spring Boot API)
│   ├── src/
│   │   └── main/java/com/collectify/...
│   └── application.properties
│
├── frontend/ (React Native com Expo)
│   ├── App.js
│   └── assets/
│       └── imagens dos quadrinhos
│
└── README.md
```

---

## 🚀 Como Executar o Projeto

### 🔧 Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Thiago-234/Collectify
   cd collectify/backend
   ```

2. Configure o `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/collectify_db
   spring.datasource.username=catalogo
   spring.datasource.password=root
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Rode o servidor:
   ```bash
   ./mvnw spring-boot:run
   ```

A API estará disponível em: `http://localhost:8080`

---

### 📱 Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd ../Collectify
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o app:
   ```bash
   npx expo start
   ```

Abra com o app **Expo Go** no celular ou use o emulador Android/iOS.

---

## 🔁 Funcionalidades

- 📋 Listagem de quadrinhos com detalhes
- ➕ Adicionar novo quadrinho
- ✏️ Editar informações de quadrinhos
- 🗑️ (Em breve) Remover quadrinhos
- 💾 Integração com backend para persistência

---


