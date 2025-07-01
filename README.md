# 🛍️ Clothzy - Fashion E-Commerce Website

Clothzy is a modern, full-stack fashion e-commerce platform built using **React + Vite** for the frontend and **Node.js + Express + MongoDB** for the backend. It supports user authentication, dynamic product listing, cart management, order checkout, and admin-controlled product updates.

---

## 🌐 Live Deployment

🚀 Frontend: [Netlify Hosting Panel](https://app.netlify.com/projects/clothzzyshopping/overview)
🛠️ Backend: Hosted via [Render](https://render.com/) or [Railway](https://railway.app/) *(if WebEyeSoft doesn’t support Node.js)*

---

## 📦 Project Structure

clothzy-client/
├── backend/ # Node.js + Express API
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── .env
│ └── server.js
|
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── App.jsx
│ ├── main.jsx
│ └── vite.config.js
└── README.md

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

## 🛠 Features

- 👕 Browse products by Men, Women, Kids
- 🛒 Add to cart & quantity updates
- 🔐 Login & Register using JWT
- 🧾 Save cart for logged-in users
- 📬 Subscribe to newsletter
- 📦 Order placement (only for authenticated users)
- 📋 My Orders visible on profile page
- 📱 Responsive UI/UX using modern CSS & Poppins font

---

## 🧩 Tech Stack

| Frontend         | Backend                | Database  |
|------------------|------------------------|-----------|
| React + Vite     | Node.js + Express      | MongoDB Atlas |
| Axios, JWT       | Mongoose, bcryptjs     | Mongoose ODM |
| React Router DOM | dotenv, cors           | MongoDB Cloud |

---

## 🚀 Deployment Instructions

### 🔧 Frontend (React + Vite)

1. Build production files:
   ```bash
   npm run build
Go to WebEyeSoft → cPanel → File Manager

Navigate to public_html/

Upload contents of dist/ (not the folder itself)

(For React Router) Add .htaccess in public_html/:

RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]


🔧 Backend (Node.js + Express)
If WebEyeSoft supports Node:

Go to “Setup Node.js App” in cPanel

Choose Node version (16 or 18+)

Set application root as backend/

Upload code

Configure .env (Mongo URI, JWT_SECRET)

Run npm install

Start app and monitor logs

If not supported:
Host backend on:

Render

Railway

Then update frontend API URLs accordingly.


 Environment Variables
.env (for backend):

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
🧪 Testing the App
Register a new user

Add items to cart

Logout and login again — cart is preserved

Try placing an order → success only if logged in

View orders from the Profile page

 Environment Variables
.env (for backend):

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
🧪 Testing the App
Register a new user

Add items to cart

Logout and login again — cart is preserved

Try placing an order → success only if logged in

View orders from the Profile page

 Environment Variables
.env (for backend):

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
🧪 Testing the App
Register a new user

Add items to cart

Logout and login again — cart is preserved

Try placing an order → success only if logged in

View orders from the Profile page

📧 Contact
Project by: [Vikash Yadav]
Email: vikashyadav2000117@gmail.com
GitHub: github.com/yourusername
