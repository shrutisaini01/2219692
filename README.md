

# 🔗 URL Shortener

A full-stack URL shortener application built with **React**, **Node.js**, **Express**, and **MongoDB**. The app allows users to shorten long URLs and retrieve statistics for each shortened link.

---

## 🚀 Features

* Shorten any valid URL
* View statistics for shortened URLs (clicks, created date)
* Responsive UI with Material-UI (MUI)
* Logging middleware integrated with external API
* Modular backend structure (Controllers, Routes, Middleware)
* MongoDB for data persistence

---

## 🗂️ Folder Structure

```
2219692/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   └── URLShortener.jsx
│   │   └── App.jsx
│   └── package.json
│
├── server/              # Express backend
│   ├── controllers/
│   │   └── url.controller.js
│   ├── models/
│   │   └── url.model.js
│   ├── routes/
│   │   └── url.routes.js
│   ├── utils/
│   │   └── auth.js
│   ├── Logging_Middleware/
│   │   └── middleware.js
│   ├── index.js
│   └── package.json
```

---

## 🧪 Prerequisites

* Node.js (v18 or later)
* npm
* MongoDB (local or Atlas)
* Git

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

---

### 2. Setup the Backend

```bash
cd server
npm install
```

> If you’re using MongoDB locally, ensure it's running:

```bash
mongod
```

If using MongoDB Atlas, replace the connection string in `index.js`:

```js
mongoose.connect("your-mongodb-uri", { useNewUrlParser: true, useUnifiedTopology: true });
```

Then start the server:

```bash
node index.js
```

You should see:

```
Server is running on port: 3000!
MongoDB connected!
```

---

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Backend Routes

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/shorturls`            | Shortens a given long URL     |
| GET    | `/shorturls/:shortcode` | Retrieves stats for short URL |

---

## 🔍 Testing the URL Shortener

### ✅ Functional Test Case Example:

**Input:**
Long URL: `https://www.google.com/search?q=url+shortener+test`

**Expected Output:**

* A new short URL like: `http://localhost:3000/abc123`
* Stats available at `GET /shorturls/abc123`

---

## 🛠️ Built With

* **Frontend:** React, Vite, Material-UI
* **Backend:** Node.js, Express, Mongoose, Axios
* **Database:** MongoDB
* **Logging API:** External logging via Axios
* **Authentication Helper:** `utils/auth.js`

---

## 🐞 Troubleshooting

### MongoDB Connection Error

If you see:

```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

* Ensure MongoDB is running locally with: `mongod`
* Or configure MongoDB Atlas and update your connection string.

---

## 🧪 Dev Tools

* [React DevTools](https://react.dev/learn/debugging-components)
* [MongoDB Compass](https://www.mongodb.com/products/compass)
* Postman for API testing

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author
<img width="1436" height="703" alt="Screenshot 2025-07-15 131918" src="https://github.com/user-attachments/assets/c6ea90dc-65cf-4a13-b695-398fd2fdb81f" />
<img width="1919" height="937" alt="Screenshot 2025-07-15 130501" src="https://github.com/user-attachments/assets/5a4adf8a-1c6b-4287-81a9-0aaf19018862" />


