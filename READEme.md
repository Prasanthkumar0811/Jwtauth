# 🚀 JWT Authentication Full Stack Application

This is a Full Stack Authentication Project built using:

- Angular (Frontend)
- Express.js (Backend)
- MongoDB (Database)
- JWT (Authentication)

---

## 📂 Project Structure

```
jwtauth/
 ├── frontend/   → Angular Application
 ├── backend/    → Express API Server
 ├── .gitignore
 └── README.md
```

---

## 🛠 Technologies Used

### Frontend
- Angular
- TypeScript
- Angular Material
- RxJS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/jwtauth.git
```

---

## 🔹 Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

Backend runs at:
```
http://localhost:5000
```

---

## 🔹 Setup Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend runs at:
```
http://localhost:4200
```

---

## 🔐 Features

- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Token Verification Middleware
- Password Hashing (bcrypt)

---

## 👨‍💻 Author

Prasanth Kumar

---

## 📜 License

This project is for learning and development purposes.