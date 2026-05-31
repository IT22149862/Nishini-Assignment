Cleaning Service Management System

A full-stack web application for booking professional cleaning services online.

**Tech Stack:** Vue.js · Node.js · Express.js · MongoDB Atlas

---

## Project Structure
Cleaning-Service-System/
├── backend/      → Node.js + Express REST API
└── frontend/     → React.js + Vite frontend

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free at mongodb.com/cloud/atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
ADMIN_SECRET=admin123

Seed the database with 8 cleaning services:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

> Make sure the backend is running before starting the frontend.

---

## 🔗 API Documentation

### Base URL
http://localhost:5000/api

---

### Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/services` | None | Get all available services |
| GET | `/services/:id` | None | Get single service |
| POST | `/services` | Admin | Create a service |
| PUT | `/services/:id` | Admin | Update a service |
| DELETE | `/services/:id` | Admin | Delete a service |

**Example Response — GET /services**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "64f1a...",
      "name": "Deep Clean",
      "description": "Full top-to-bottom cleaning...",
      "price": 8500,
      "category": "Residential"
    }
  ]
}
```

---

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | None | Submit a new booking |

**Request Body — POST /bookings**
```json
{
  "customerName": "John Silva",
  "email": "john@example.com",
  "phone": "0771234567",
  "service": "<service_id>",
  "date": "2025-08-20",
  "time": "10:00 AM",
  "address": "45 Galle Road, Colombo 03",
  "notes": "Please bring eco-friendly products"
}
```

---

### Admin Routes (Protected)

All admin routes require this request header:
x-admin-secret: admin123

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/bookings` | View all bookings |
| PATCH | `/admin/bookings/:id/complete` | Mark booking as Completed |
| DELETE | `/admin/bookings/:id` | Delete a booking |

---

## 🖥️ Pages

| Route | Description |
|-------|-------------|
| `/` | Home page (Hero, About, Services, Booking, Gallery, Reviews, Contact) |
| `/admin` | Admin dashboard — enter secret `admin123` to access |

---

## ✅ Features

- Browse 8+ cleaning services fetched from MongoDB
- Online booking form with full validation
- Bookings saved to MongoDB Atlas
- Admin dashboard to view, complete, and delete bookings
- Photo gallery with lightbox
- Google Maps embedded in footer
- WhatsApp quick contact button
- Fully responsive (Mobile, Tablet, Desktop)