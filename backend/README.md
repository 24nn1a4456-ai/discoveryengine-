# AI Discovery Engine Backend

## Overview

The AI Discovery Engine Backend is a REST API developed using **Node.js**, **Express.js**, and **MongoDB**. It acts as the backbone of the application by handling user authentication, product management, search functionality, activity tracking, and recommendation services.

The project follows the **MVC (Model-View-Controller)** architecture, making the code organized, reusable, and easy to maintain. This backend communicates with the frontend through REST APIs and stores all application data in MongoDB.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- CORS
- Nodemon

---

## Project Structure

```
AI-Discovery-Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── activityController.js
│   ├── recommendationController.js
│   └── searchController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Activity.js
│   └── Cart.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── activityRoutes.js
│   ├── recommendationRoutes.js
│   └── searchRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

Move into the project folder.

```bash
cd AI-Discovery-Backend
```

---

### Step 2: Install Dependencies

Install all required packages using:

```bash
npm install
```

If you haven't installed them already, run:

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

---

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add the following values.

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/DiscoveryEngine

JWT_SECRET=yourSecretKey
```

---

## Running the Server

To start the server in development mode:

```bash
npx nodemon server.js
```

Or run it normally:

```bash
node server.js
```

If everything is configured correctly, you should see:

```
MongoDB Connected
Server running on port 5000
```

---

## Database

The application uses **MongoDB** as its database.

Database Name:

```
DiscoveryEngine
```

The following collections are created automatically when data is added:

- Users
- Products
- Activities
- Carts

---

## Database Models

### User

Stores user details such as:

- Name
- Email
- Password (encrypted)
- Age
- Gender

---

### Product

Stores product information including:

- Product Name
- Brand
- Category
- Price
- Description
- Product Image

---

### Activity

Tracks user interactions with products.

Each activity records:

- User ID
- Product ID
- Action
- Timestamp

Supported actions include:

- View
- Click
- Add to Cart
- Purchase

---

### Cart

Stores the products added by users.

Fields include:

- User ID
- Product ID
- Quantity

---

## API Endpoints

### Authentication

- Register User
- Login User

---

### Products

- Get all products
- Add a new product
- Update product details
- Delete a product

---

### Search

- Search products using keywords

---

### Activity

- Save user activities such as viewing, clicking, or purchasing products

---

### Recommendations

- Return personalized product recommendations based on user activity

---

## Application Flow

The backend follows a simple workflow.

```
Frontend

↓

Routes

↓

Controllers

↓

Models

↓

MongoDB

↓

JSON Response
```

This separation of responsibilities keeps the project clean and makes future development easier.

---

## Testing

All APIs were tested using **Postman**.

The following functionalities have been verified:

- User Registration
- User Login
- Get Products
- Add Product
- Update Product
- Delete Product
- Search Products
- Save User Activity
- Recommendation API

---

## Features Completed

✔ User Authentication

✔ MongoDB Integration

✔ REST API Development

✔ Product Management

✔ User Activity Tracking

✔ Recommendation Module

✔ Search Functionality

✔ Shopping Cart Model

✔ MVC Project Structure

✔ API Testing with Postman

---

## Future Enhancements

Some features planned for future development include:

- AI-based personalized recommendations
- Product image upload
- Wishlist functionality
- Advanced search filters
- Pagination
- Admin Dashboard
- Order Management
- Payment Gateway Integration
- Cloud Deployment

---

