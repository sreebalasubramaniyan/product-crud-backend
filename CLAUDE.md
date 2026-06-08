# Project: Product CRUD API

## Overview
A Node.js/Express REST API for managing products with MongoDB/Mongoose.

## Tech Stack
- Express.js 5.2.1
- Mongoose 9.6.3
- MongoDB
- Dotenv

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Server runs on port 3000.

## Project Structure

```
/index.js              - Main entry point, server setup
/models/product.model.js - Mongoose schema for Product
/controllers/          - Route handlers
/routes/               - API route definitions
.env                   - Environment variables (MONGO_URI)
```

## API Endpoints

Base URL: `/api/products`

| Method | Endpoint       | Description        |
|--------|----------------|-------------------|
| GET    | /              | Get all products  |
| GET    | /:id           | Get single product|
| POST   | /              | Create product    |
| PUT    | /:id           | Update product    |
| DELETE | /:id           | Delete product    |

## Key Details

- MongoDB connection string in `.env` as `MONGO_URI`
- Product model: `name` (required), `quantity` (default: 0), `image` (optional)
- Timestamps enabled (createdAt, updatedAt)
- Express middleware: `express.json()`, `express.urlencoded({extended: false})`