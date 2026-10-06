# EduVerse

EduVerse is a full-stack MERN application for online learning and course management. It allows students to browse courses, enroll in programs, track progress, and interact with a learning platform, while admins can manage courses, users, and content.

## Features

- User authentication and authorization
- Course catalog with category filters
- Enrollment and progress tracking
- Admin dashboard for managing courses and users
- Responsive UI for desktop and mobile
- REST API built with Node.js and Express
- MongoDB database integration

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Deployment ready: Vercel / Render style setup

## Project Structure

```bash
eduverse-mern-final/
├── client/               # React frontend
├── server/               # Express backend
├── package.json          # Root scripts
├── README.md            # Project documentation
├── .env.example         # Environment variable example
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or later)
- npm or yarn
- MongoDB instance or MongoDB Atlas connection

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd eduverse-mern-final
```

2. Install dependencies for both frontend and backend:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

3. Create environment files:

- Copy `.env.example` from the server/client if available and update your values.
- Set database URL, JWT secret, and other required config.

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduverse
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Running the Application

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

The frontend usually runs at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Environment Variables

Add these variables to your environment:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `NODE_ENV`

## Scripts

Available from the root or individual apps depending on setup:

```bash
npm run dev
npm run build
npm run start
```
