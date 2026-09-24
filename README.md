# 📝 Bloggify

A clean, responsive blogging platform built with **Node.js**, **Express**, and **EJS**, styled using **Bootstrap 5**. Users can read blogs publicly, but must register or log in to create posts and leave comments.

---

## ✨ Features

- **User Authentication**: Secure Sign-up and Sign-in functionality.
- **Dynamic Content**: Personalized navigation bar displays the logged-in user's name (`fullName`).
- **Blog Creation**: Authenticated users can write and publish new blog posts.
- **Comment System**: Only logged-in users can participate in discussions and comment on blogs.
- **Responsive UI**: Built using modern **Bootstrap 5 (via CDN)** for a seamless mobile and desktop experience.
- **Clean Architecture**: Organized structure separated into Models, Views, Routes, Middleware, and Services.

---

## 🛠️ Tech Stack

- **Backend**: Node.js (v22.x) & Express.js
- **Frontend**: EJS (Embedded JavaScript templates) & Bootstrap 5
- **Database**: MongoDB (Object Data Modeling via Mongoose)

---

## 📂 Project Structure

```text
Bloggify/
├── middleware/    # Authentication and security route checks
├── models/        # Mongoose schemas (User, Blog, Comment)
├── public/        # Static assets (images, custom CSS)
├── routes/        # Express routers (user routes, blog routes)
├── service/       # Helper services (e.g., authentication tokens)
├── views/         # EJS templates (partials, home, add blog, view blog)
├── .env.example   # Example configuration for environment variables
├── .gitignore     # Files ignored by Git
├── app.js         # Entry point of the application
├── package.json   # Project dependencies and metadata
└── README.md      # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to set up and run Bloggify locally on your system:

### 1. Clone the Repository
```bash
git clone https://github.com
cd Bloggify
```

### 2. Install Dependencies
Make sure you are using **Node.js version 22** or higher:
```bash
npm install
```

### 3. Environment Setup
1. Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the values with your local settings:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/bloggify
   JWT_SECRET=your_super_secret_key_here
   ```
   *(Note: You can replace `MONGO_URL` with your local MongoDB URI or a MongoDB Atlas connection string, and set any `PORT` you prefer).*

### 4. Run the Application
Start the development server:
```bash
npm start
```
Alternatively, if you have `nodemon` installed:
```bash
npm run dev
```

Your terminal will show that the server is running. Open your browser and navigate to:
👉 **`http://localhost:8000`** *(or your custom port)*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
