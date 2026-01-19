# MediaMarkt Clone (Nuxt 3 + Firebase)

This is a full-stack E-Commerce application developed as a final assignment. It replicates the core functionality of the MediaMarkt website, featuring a complete customer shopping experience, a real-time Admin Panel, and a dynamic data architecture.

## 🚀 Technologies Used
- **Framework:** Nuxt 3 (Vue.js 3)
- **State Management:** Pinia (4 Stores: Auth, Cart, Products, Orders)
- **Styling:** Tailwind CSS (Atomic Design Principles)
- **Database & Auth:** Firebase (Firestore & Authentication)
- **Language:** TypeScript

## ✨ Key Features

### 1. Customer Panel
- **Atomic Design UI:** Pixel-perfect replication of MediaMarkt components.
- **Product Browsing:** Dynamic listing of products from Firebase.
- **Shopping Cart:** Add/remove items with real-time total calculation.
- **User Authentication:** Custom Login/Register pages using Firebase Auth.
- **Order History:** Users can track their past orders and current status.

### 2. Admin Panel (Back-Office)
- **Dashboard:** Overview of total sales and products.
- **Product Management:** Add, Edit, and Delete products with real-time updates.
- **Order Management:** View all customer orders and update shipping status (e.g., "Hazırlanıyor" -> "Kargolandı").
- **Secure Layout:** Dedicated Admin Layout with sidebar navigation.

### 3. Advanced Architecture (Requirement Met)
- **Pinia Stores:** All database logic is decoupled from pages and handled inside Pinia actions.
- **Data Source Switch:** The app supports switching between **Firebase** and a **Local API** via configuration.

---

## 🛠️ Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install