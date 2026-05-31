# Cleaning Service Backend API

## Setup Instructions

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
Create a `.env` file (already provided):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cleaning-service
ADMIN_SECRET=admin123
```
> Change `ADMIN_SECRET` to something secure before deploying.

### 3. Seed the database
```bash
npm run seed
```
This inserts 8 default cleaning services into MongoDB.

### 4. Start the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```
Server runs at: `http://localhost:5000`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/services` | None | Get all available services |
| GET | `/services/:id` | None | Get single service |
| POST | `/services` | Admin | Create a service |
| PUT | `/services/:id` | Admin | Update a service |
| DELETE | `/services/:id` | Admin | Delete a service |

**GET /services — Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "name": "Deep Clean",
      "description": "...",
      "price": 8500,
      "image": "...",
      "category": "Residential",
      "isAvailable": true
    }
  ]
}
```

---

### Bookings (Public)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | None | Submit a booking |

**POST /bookings — Request Body:**
```json
{
  "customerName": "John Silva",
  "email": "john@example.com",
  "phone": "0771234567",
  "service": "<service_id>",
  "date": "2025-08-20",
  "time": "10:00",
  "address": "45 Galle Road, Colombo",
  "notes": "Please bring eco-friendly products"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking submitted successfully!",
  "data": { ... }
}
```

---

### Admin Routes (Protected)

All admin routes require the header:
```
x-admin-secret: admin123
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/bookings` | View all bookings |
| PATCH | `/admin/bookings/:id/complete` | Mark booking as Completed |
| DELETE | `/admin/bookings/:id` | Delete a booking |

---

## Folder Structure

```
backend/
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   ├── serviceController.js
│   └── bookingController.js
├── middleware/
│   └── adminAuth.js      # Admin route protection
├── models/
│   ├── Service.js        # Service schema
│   └── Booking.js        # Booking schema
├── routes/
│   ├── serviceRoutes.js
│   ├── bookingRoutes.js
│   └── adminRoutes.js
├── .env                  # Environment variables
├── package.json
├── seed.js               # Database seeder
└── server.js             # Entry point
```
