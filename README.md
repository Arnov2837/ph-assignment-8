# 📚 Mango Library

A modern online book borrowing platform where users can explore, search, and borrow books seamlessly.

---

## 🚀 Live URL

👉

---

## 🎯 Project Purpose

Mango Library is designed to digitize the traditional library experience.
Users can browse books, view details, and manage their profile with secure authentication.

---

## ✨ Key Features

* 🔐 Authentication System (Email/Password + Google Login)
* 📖 Browse All Books with Search & Category Filter
* 📚 Featured Books Section on Homepage
* 🔍 Book Details Page (Private Route)
* 👤 User Profile (Private Route)
* ✏️ Update Profile (Separate Route - Challenge)
* 🎯 Responsive Design (Mobile, Tablet, Desktop)
* 🎞️ Smooth Animation using Framer Motion
* 🧾 Marquee Announcement Section
* 🎨 Clean & Modern UI Design

---

## 🧠 Technologies Used

* Next.js 16
* Tailwind CSS
* Better Auth
* MongoDB
* Framer Motion
* React Icons
* React Hot Toast

---

## 📂 Pages Overview

| Page              | Description                                    |
| ----------------- | ---------------------------------------------- |
| `/`               | Home (Hero, Marquee, Featured, Extra Sections) |
| `/books`          | All Books with Search & Filter                 |
| `/books/[id]`     | Book Details (Private)                         |
| `/login`          | User Login                                     |
| `/register`       | User Registration                              |
| `/profile`        | User Profile                                   |
| `/profile/update` | Update Profile (Challenge)                     |

---

## 🔐 Environment Variables

Create a `.env.local` file and add:

```
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
```

---

## ⚙️ Installation & Setup

```
git clone  https://github.com/Arnov2837/ph-assignment-8
cd your folder
npm install
npm run dev
```

---

## 📦 Deployment

This project is deployed on **Vercel**.

Make sure to:

* Add environment variables
* Set correct redirect URLs for Google Auth

---

## 📌 Challenges Implemented

* ✅ Update Profile Feature (Separate Route)
* ✅ Category Filter System
* ✅ Framer Motion Animation

---

## 📊 GitHub Commits

✔ meaningful commits with clear messages

---

## 👨‍💻 Author

Developed by **Shohanur Roshid**

---

## 📄 License

This project is for ph-educational purposes.
