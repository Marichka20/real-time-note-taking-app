PROJECT OVERVIEW

This project is a backend server for a real-time collaborative notes application. It provides basic authentication, token validation, and WebSocket-based real-time updates for shared notes.

SETUP INSTRUCTIONS

Prerequisites

Node.js (latest LTS recommended)

npm or yarn

Installation

Clone the repository:

git clone https://github.com/Marichka20/real-time-note-taking-app

Install dependencies:

npm install

Start the server:

npm run dev

The server will run on http://localhost:5000.

Technology Stack

Node.js - Backend runtime

Express.js - Web framework

Socket.io - WebSocket support for real-time updates

jsonwebtoken (JWT) - Authentication and token validation

bcrypt - Secure password hashing

CORS - Cross-origin resource sharing

FEATURE IMPLEMENTED

User Authentication:

Login with JWT-based authentication

Password hashing using bcrypt

Token Validation:

Endpoint to verify JWT tokens

WebSocket Communication:

Real-time notes synchronization across multiple users

Broadcasting updates to all connected clients

Basic Security Measures:

Hashed passwords

JWT authentication for session management

FUTURE IMPROVEMENTS

Database Integration: Move from in-memory user storage to a database (e.g., PostgreSQL, MongoDB)

User Registration: Add user sign-up functionality

Persistent Notes Storage: Store notes in a database instead of memory

Role-based Access Control (RBAC): Implement different user roles and permissions

Rate Limiting: Protect endpoints from brute-force attacks
