
# 📚 Peer-to-Peer Book Exchange Portal

A full-stack web application that connects **Book Owners** with **Book Seekers** for book sharing, exchange, or rent.

Built with **Next.js**, **Node.js**, **Express**, and **MongoDB**, the platform supports secure authentication, book listings, filtering, and profile-based access.

---

## 🎯 Objective

Build a simple yet functional web application where:
- **Book Owners** can list books for rent or exchange.
- **Book Seekers** can browse, filter, and search for books.
- Basic authentication and user profile handling implemented.

---

## 🔧 Tech Stack

| Layer     | Stack Used                    |
|-----------|-------------------------------|
| Frontend  | React + Next.js (App Router)  |
| Backend   | Node.js + Express             |
| Storage   | MongoDB (hosted on Atlas)     |
| Deployment |Vercel + Render
| Auth      | Basic login (no JWT used)     |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-rent.git
cd book-connect
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file

```env
MONGO_URI=your_mongodb_uri
```

#### Run Server

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Run App

```bash
npm run dev
```

---

## ✅ Features Implemented

### 🔐 User Profiles
- Signup/Login for **Owner** and **Seeker**
- Fields: `Name`, `Email`, `Password`, `Mobile Number`, `Role`
- Roles define feature access:
  - **Owner** → Can Add/Edit/Delete Books
  - **Seeker** → Can View/Filter/Search Listings

### 📚 Book Listings
- Add Book (Owner only)
- View All Books (public)
- Filter by Genre and Location
- View Book by ID
- Edit/Delete Book (only by owner)
- Status Toggle (Available / Rented)

### 🧪 API Endpoints

| Route | Method | Role | Description |
|-------|--------|------|-------------|
| `/auth/signup` | POST | Public | Register new user |
| `/auth/login` | POST | Public | Login user |
| `/books/` | GET | Public | Get all books |
| `/books/` | POST | Owner | Add new book |
| `/books/:id` | GET | Public | View book by ID |
| `/books/:id` | PUT | Owner | Edit a book |
| `/books/:id` | DELETE | Owner | Delete a book |
| `/books/:id/status` | PATCH | Owner | Toggle book availability |

---

## 🧪 What’s Working

- ✅ Role-based access control
- ✅ Fully functional book management (CRUD)
- ✅ Filtering by genre
- ✅ Owner-Only listing control
- ✅ Tested API via Postman
- ✅ Cover Image support via URL

---

## 🚧 What’s Not (Yet)

- ❌ Book request or direct messaging
- ❌ Image upload (only URL allowed)

---

## 🌟 Bonus Features Added

- Edit/Delete your own listings
- Genre and Locationbased filtering
- Book availability status toggle
- Real book cover images
- MongoDB-based persistence
- Deployment(Vercel + Render)

---

## 🤖 AI Tools Used

- **ChatGPT**: Used as a planning assistant to brainstorm schema design, improve data modeling strategies, and validate architectural decisions. Also helpful for generating concise documentation and refining API contract structures.
- **Cluade**: Utilized for organizing project structure, validating code quality, and maintaining a clean, consistent codebase. Assisted in preparing readable documentation and polishing the README for better communication. 

---

## 📂 Folder Structure

```
📦 book-connect
├── server
├── config
│   └── db.js
├── controllers
│   ├── auth.js
│   └── book.js
├── index.js
├── models
│   ├── Book.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.js
│   └── book.js
└── seed.js
├── frontend
├── app
│   ├── add-book
│   │   └── page.js
│   ├── books
│   │   └── [id]
│   │       └── page.js
│   ├── components
│   │   ├── BookCard.js
│   │   ├── FilterBar.js
│   │   └── Navbar.js
│   ├── context
│   │   └── AuthContext.js
│   ├── dashboard
│   │   └── page.js
│   ├── edit-book
│   │   └── [id]
│   │       └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── login
│   │   └── page.js
│   ├── page.js
│   ├── register
│   │   └── page.js
│   └── services
│       └── bookService.js
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── public
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

---

## 👥 User Roles

| Role   | Can Add Books | Can Edit/Delete | Can Browse/Search |
|--------|----------------|------------------|--------------------|
| Owner  | ✅              | ✅                | ✅                  |
| Seeker | ❌              | ❌                | ✅                  |

---

## 📦 Deployment 

- Frontend → Vercel
- Backend → Render 

---

