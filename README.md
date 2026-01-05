Blog App (Backend)
A simple Blog App backend built with Node.js, Express, and MySQL, focusing on API design, authentication, and database integration.

This project reflects my understanding of:
- RESTful APIs
- MySQL database structure and queries
- User authentication (Signup & Login)
- Password hashing and security
- API testing using Postman

Features:
- User Signup with validation
- User Login with authentication
- Password hashing using bcrypt
- Secure authentication using JWT
- MySQL database connection using a connection pool
- Tested APIs using Postman
- Ready to be connected to a frontend GUI

Technologies Used:
Node.js
Express.js
MySQL
mysql2
bcrypt
jsonwebtoken (JWT)
Postman (for API testing)

Project Structure
blog-app/
│
├── app.js
├── package.json
├── package-lock.json
└── database/

Database Schema (users table)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    u_first_name VARCHAR(50),
    u_middle_name VARCHAR(50),
    u_last_name VARCHAR(50),
    u_email VARCHAR(100) UNIQUE,
    u_password VARCHAR(255),
    u_DOB DATE
);

API Endpoints
Signup
POST /auth/signup
Request Body:
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "DOB": "1998-05-10"
}

Response:
{
  "message": "Account registered successfully"
}
Login
POST /auth/login
Request Body:
{
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}

Testing
All endpoints were tested using Postman
After successful testing, APIs were connected to the app’s GUI
Validation and error handling were tested for:
Missing fields
Incorrect credentials
Duplicate emails

How to Run the Project
Clone the repository
git clone https://github.com/your-username/blog-app.git
Install dependencies
npm install
Configure your MySQL database
Create a database named blog_app
Update database credentials in app.js

Start the server
node app.js
Server will run on:
http://localhost:3000

What I Learned
Structuring backend projects using Express
Working with MySQL queries and connection pools
Implementing secure authentication
Handling API validation and errors
Testing APIs before frontend integration

Future Improvements
Blog post creation (CRUD)
Comments & likes
Role-based authorization
Refresh tokens
Better folder structure (MVC pattern)

Contact
Feel free to reach out if you want to discuss the project or suggest improvements.
