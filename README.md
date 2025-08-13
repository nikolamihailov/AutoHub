# 🚗 AutoHub – Full Stack Car Marketplace

## Overview
AutoHub is a modern, full-stack car marketplace where users can browse, sell, and manage car listings. Built with a **Node.js/Express + MongoDB backend** and a **powerful Angular frontend**, it delivers a seamless experience for guests, registered users, and administrators.  

The app features **infinite scrolling for all pages, search, filtering, sorting, image galleries, authentication guards, admin management tools, and a responsive design** for all devices.  

---

## 🛠️ Technologies Used

### **Backend Stack**
[![Node.js](https://img.shields.io/badge/Node.js-✓-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-✓-lightgrey)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-✓-4DB33D)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-✓-orange)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-✓-blue)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-✓-blueviolet)](https://www.npmjs.com/package/bcrypt)

### **Frontend Stack**
[![Angular](https://img.shields.io/badge/Angular-✓-red)](https://angular.io/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-✓-blue)](https://material.angular.io/)
[![Angular Animations](https://img.shields.io/badge/Angular_Animations-✓-green)](https://angular.io/guide/animations)
[![Toastr](https://img.shields.io/badge/Toastr-✓-orange)](https://www.npmjs.com/package/ngx-toastr)
[![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)](https://www.typescriptlang.org/)

---

## 📌 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Testing Data](#testing-data)
- [Project Demo & Video](#project-demo--video)

---

## 📖 Project Overview
AutoHub is designed for **three user roles**:  
- **Guests** – explore and search listings  
- **Registered Users** – manage their own listings and saved offers  
- **Admins** – control the platform with advanced management tools  

The platform is responsive, interactive, and built for **speed, security, and usability**.

---

## ✨ Features

### **Guest Features** 🧭
- 🔍 **Search & Filter** – by brand, model, or category  
- 📊 **Sort** – by price or creation date  
- 🖼️ **Image Galleries** – detailed car images & slideshows  
- 📄 View **About Us** & **Contact Us** pages  
- 🛡️ Authentication guards for protected pages  
- 🎨 Animations, form validations, and toast notifications

---

### **Logged-In User Features** 👤
- All **guest features** plus:
- 📝 **Profile Management** – edit info & upload profile image  
- 🚘 **Offer Management** – add, edit, delete car offers  
- 🏷️ **Mark as Sold** – hide offers from public view  
- ❤️ **Saved Offers** – add/remove offers to favorites  
- 🏢 **Dealership Offers** – view all offers from a dealership account (private users’ offers are hidden)

---

### **Admin Features** 🛠️
- All **logged-in user features** plus:
- 📋 **Admin Panel** – central hub for platform management  
- 👥 **User Management** – view & delete accounts  
- 🗂️ **Category Management** – CRUD with image upload  
- 🚗 **Car Offer Management** – CRUD with animated image handling  
- 🔐 Full access to **all offers** and moderation tools

---

## 🎨 Theme & UX
- Custome components combined with Material Design components  
- Smooth animations with Angular Animations  
- Toast notifications for instant feedback  
- Responsive layout for mobile & desktop  
- Form validations for authentication and listings

---

## 🚀 Running the Application

### **Back-end**

- Replace `process.env` variables with your own variables (follow comments in code)
  
```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Start server
npm run dev
```

### **Front-end**
- Replace BASE_URL with http://localhost: and add the port from the BE
```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start client
npm run start
```

