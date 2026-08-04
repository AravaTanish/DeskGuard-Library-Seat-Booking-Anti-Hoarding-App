# DeskGuard

## 1. Project Overview

DeskGuard is a full-stack computer lab and session management system designed for libraries, labs, and shared computing spaces. It helps administrators manage libraries and computers, generate activation codes, and monitor real-time computer availability while students use a secure flow to start and manage their sessions.

## 2. Problem Statement

Managing computer lab usage manually is often time-consuming and error-prone. DeskGuard addresses this by providing a centralized platform to track libraries, computers, activation codes, student sessions, breaks, and session expiry with real-time updates.

## 3. Architecture

The application follows a client-server architecture with separate frontend and backend services:

- Frontend: React + Vite for a fast and interactive user interface
- Backend: Express.js server handling APIs and business logic
- Real-time communication: Socket.IO for instant status updates and session events
- Database: MongoDB with Mongoose for storing admins, libraries, computers, sessions, and activation data
- Authentication: JWT and HTTP-only cookies for secure session handling
- Notifications: Web push and email-based OTP support

## 4. Features

- Admin signup, login, logout, and password reset flow
- OTP-based authentication support for admin recovery workflows
- Library creation and management
- Computer registration under specific libraries
- Activation code generation for computers
- Student session creation using a verification code
- Real-time computer status updates such as free, occupied, break, and offline
- Session extension, break handling, and automatic expiry management
- Push notification support for computer state changes

## 5. Feature-wise Implementation

### Authentication

Admins can sign in or register securely using email and password. JWT access and refresh tokens are issued and stored in secure cookies to protect authenticated routes.

### Library and Computer Management

Administrators can create libraries, add computers under them, and generate activation codes for each computer. This makes lab resources easier to organize and manage centrally.

### Session Management

Students can start a session by entering the required verification data. The system tracks active sessions, allows breaks, supports extension, and handles expiration automatically.

### Real-time Monitoring

Socket.IO is used to push live updates to the admin interface whenever a computer changes status, helping supervisors monitor the lab in real time.

## 6. Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Zustand
- Axios
- Socket.IO Client
- Tailwind CSS
- Flowbite

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT
- Cookie Parser
- Argon2
- Web Push
- Brevo OTP delivery

## 7. Database

MongoDB is used as the primary database. The application stores:

- Admins
- Libraries
- Computers
- Activation codes
- Sessions
- Push subscriptions

This document-oriented structure is well suited for flexible lab-management and session-tracking data.

## 8. APIs

The backend exposes RESTful APIs for:

- Authentication and session management
- Library CRUD operations
- Computer creation and activation-code generation
- Student session create, extend, end, and break flows
- Client-side computer activation and session state handling

## 9. Authentication/Security

Security is implemented through:

- JWT-based authentication
- HTTP-only cookies for session handling
- Protected routes for admin, computer, and session roles
- Password hashing with Argon2
- Middleware-based error handling and request validation

## 10. Real-time Communication

Socket.IO powers the real-time layer of the application. It enables:

- Live computer status updates
- Instant session lifecycle events
- Admin notifications for occupancy changes

## 11. Performance

The application aims for a smooth experience through:

- Lightweight React/Vite frontend
- Modular Express backend
- Efficient MongoDB document structure
- Real-time updates without full-page reloads

## 12. Challenges

Some of the main challenges while building this project included:

- Synchronizing state across admin, computer, and student sessions
- Managing activation flows and role-based access securely
- Handling real-time status changes consistently
- Implementing scheduled session expiry and break workflows

## 13. Strengths

- Clear separation of admin, computer, and student session flows
- Real-time monitoring and status updates
- Secure token-based authentication
- Modular backend structure suitable for future extension

## 14. Weaknesses

- The project is still a working prototype and can be polished further for production-scale deployment
- Some workflows may need additional validation and UX refinement
- Notification and session handling can be optimized further

## 15. Future Scope

Possible improvements include:

- Advanced reporting and attendance analytics
- Multi-admin and supervisor role management
- Booking and queue management for shared labs
- Better UI/UX and mobile responsiveness
- Enhanced notification center and audit logs

## 16. How to Run

To run the project locally, follow these steps:

1. Clone the repository
2. Install backend dependencies:
   - cd backend
   - npm install
3. Install frontend dependencies:
   - cd frontend
   - npm install
4. Create environment files:
   - Backend: create a .env file inside the backend folder
   - Frontend: create a .env file inside the frontend folder
5. Start the backend server:
   - cd backend
   - npm run start
6. Start the frontend app:
   - cd frontend
   - npm run dev

### Backend .env example

Create a .env file in the backend folder with values similar to:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/deskguard
JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES=15m
JWT_REFRESH_TOKEN_EXPIRES=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
BREVO_API_KEY=your_brevo_api_key
EMAIL_USER=your_sender_email
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

### Frontend .env example

Create a .env file in the frontend folder with values similar to:

```env
VITE_API_URL=http://localhost:5000
```

## 17. Conclusion

DeskGuard demonstrates a practical full-stack solution for managing computer laboratories, student sessions, and real-time usage tracking. It serves as a strong foundation for learning modern web development, authentication, real-time communication, and role-based application design.
