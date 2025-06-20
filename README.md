# BuyBuy – Buy/Sell/Swap Platform

BuyBuy is a full-stack web application that allows users to buy, sell, and swap products. It features user authentication, product listings, favorites, seller tools, and real-time chat. The app is built using a **Ruby on Rails API backend** and a **React frontend powered by Vite**. Created by [**Nkiruka Odu**](https://github.com/Odu-Enkay) and [**Manav Panchotiya**](https://github.com/manavpanchotiya/).

---

## 🧱 Tech Stack

- **Frontend:** React (Vite), Material UI
- **Backend:** Ruby on Rails (API mode)
- **Database:** PostgreSQL
- **Authentication:** Token-based (localStorage)
- **Real-time:** ActionCable (WebSockets)
- **Deployment:** Netlify (Frontend), Render or Railway (Backend & DB)

---

## 🚀 Features

- ✅ User sign up / login / logout  
- 🛒 Create, edit, delete product listings (for sellers)  
- 🧾 View all products and detailed product pages  
- ❤️ Save/favorite products  
- 📦 Seller dashboard at `/seller`  
- 🛠 Admin dashboard (WIP)  
- 💬 Real-time messaging with ActionCable (WIP)  
- 📱 Responsive design with Material UI  

---

## 🛠️ Local Development Setup

## 📁 Project Structure
```text
project-root/
├── backend/              # Rails API backend
│   ├── app/
│   ├── config/
│   └── ...
├── frontend/             # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── ...

### Backend (Rails)
1. Clone the repo and install dependencies:
   
   bundle install
   
2. Set up the database:
   
   rails db:create db:migrate db:seed
   rails s
   ```

Backend runs at http://localhost:3000

### Frontend (React + Vite)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
Frontend runs at http://localhost:5173
