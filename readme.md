
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
- Filter by Genre (optional)
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

- ❌ Profile page or update info
- ❌ Book request or direct messaging
- ❌ Image upload (only URL allowed)
- ❌ Deployment

---

## 🌟 Bonus Features Added

- Edit/Delete your own listings
- Genre-based filtering
- Book availability status toggle
- Real book cover images
- MongoDB-based persistence
- Deployment(Vercel + Render)

---

## 🤖 AI Tools Used

- **ChatGPT**: Used for backend planning, schema design, code refactoring, and README generation.
- **GitHub Copilot**: Autocompletion in frontend form handling and validations.
- **Mockaroo** / Manual: Book mock data generation with real cover image links.

---

## 📂 Folder Structure

```
📦 book-connect
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── seed.js
│   ├── .env
│   └── server.js
├── frontend
│   ├── app
│   │   ├── login
│   │   ├── signup
│   │   ├── dashboard
│   └── .env.local
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

