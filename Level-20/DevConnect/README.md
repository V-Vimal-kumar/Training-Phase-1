# ConnectHub Social Media App

A mini social media application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (signup, login, logout)
- User profiles with customizable bio
- Post creation and management
- Comment functionality
- Like/unlike functionality
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the App

1. Start the backend server:
   ```
   npm run server
   ```

2. Start the frontend development server:
   ```
   npm run dev
   ```

3. Or run both concurrently:
   ```
   npm run dev:full
   ```

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand (state management)
  - React Router
  - Axios

- **Backend**:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JWT Authentication

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/pages` - Application pages
  - `/store` - Zustand state management
  - `/layouts` - Page layout components

- `/server` - Backend Express application
  - `/controllers` - Route controllers
  - `/models` - MongoDB models
  - `/routes` - API routes
  - `/middleware` - Custom middleware

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Post Routes
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts
- `GET /api/posts/user/:userId` - Get posts by user
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/:id/like` - Like a post
- `PUT /api/posts/:id/unlike` - Unlike a post
- `POST /api/posts/:id/comment` - Add comment to a post