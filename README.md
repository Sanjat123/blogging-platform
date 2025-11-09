# Blogging Platform: A Full-Stack MERN Blogging Platform

This is a comprehensive MERN stack (MongoDB, Express.js, React.js, Node.js) blogging application. It is inspired by platforms like Medium and includes full user authentication, blog creation, and community interactions like likes and comments.

This project also includes a conceptual model in C++ (in the `cpp_oops_model` folder) to demonstrate how the system's design is based on Object-Oriented Programming (OOP) principles.

---

## 🚀 Key Features

* **Multi-Method Authentication:** Users can sign up and log in via three methods:
    1.  **Email/Password:** Standard registration with `bcrypt` for password hashing.
    2.  **Google Authentication:** Server-side token verification using the Firebase Admin SDK.
    3.  **GitHub Authentication:** Full OAuth2 flow for GitHub login.
* **Secure API:** All protected API routes are secured using **JWT (JSON Web Tokens)**, verified by a custom `verifyJWT` middleware.
* **AWS S3 Image Uploads:** Images are not stored on the server. The backend generates a secure **"pre-signed URL"**, allowing the frontend to upload the file **directly to an AWS S3 bucket** for better performance and scalability.
* **Rich Text Editor:** Uses **Editor.js** to provide a modern, block-style editor. The content is saved as structured JSON in the database.
* **Interaction System:**
    * Likes, Comments, and **Nested Replies** (using a recursive schema design).
    * User **Notifications** for new likes, comments, and replies.
* **User Dashboard:** A dedicated dashboard for users to manage their published blogs and drafts.
* **Search:** Users can search for blogs (by title/tag) and other users (by username).

---

## 🛠 Technology Stack

### Frontend (Client-Side)
* **React.js**
* **Vite** (Build Tool)
* **React Router** (`react-router-dom`) (Routing)
* **Tailwind CSS** (Styling)
* **Axios** (API Calls)
* **React Context API** (State Management)
* **Editor.js** (Blog Editor)
* **Firebase** (Google Auth Popup)

### Backend (Server-Side)
* **Node.js**
* **Express.js**
* **MongoDB** (Database)
* **Mongoose** (ODM - for Schemas)
* **JWT (`jsonwebtoken`)** (API Security)
* **Bcrypt** (Password Hashing)
* **Firebase Admin SDK** (Google Auth Verification)
* **AWS SDK** (S3 Image Uploads)

---

## 🖥️ How to Run Locally

### 1. Backend Server (Terminal 1)

1.  Clone the repository:
    ```bash
    git clone [https://github.com/USERNAME/REPOSITORY_NAME.git](https://github.com/USERNAME/REPOSITORY_NAME.git)
    cd REPOSITORY_NAME
    ```
2.  Navigate to the server directory and install dependencies:
    ```bash
    cd server
    npm install
    ```
3.  Create a `.env` file in the `server` directory with the following keys:
    ```
    DB_LOCATION=YOUR_MONGODB_URI
    SECRET_ACCESS_KEY=YOUR_JWT_SECRET
    
    # AWS S3 Bucket Credentials
    AWS_BUCKET_REGION=YOUR_S3_REGION
    AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
    AWS_BUCKET_NAME=YOUR_S3_BUCKET_NAME
    
    # GitHub OAuth
    GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    (Your server will be running at `http://localhost:3000`)

### 2. Frontend Client (Terminal 2)

1.  Open a second terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    npm install
    ```
2.  Create a `.env` file in the `frontend` directory:
    ```
    VITE_SERVER_DOMAIN=http://localhost:3000
    VITE_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    (Your project will open at `http://localhost:5173` or a similar port)

---
<img width="1893" height="906" alt="Screenshot 2025-11-06 223740" src="https://github.com/user-attachments/assets/89115fd8-944e-4495-b5ff-d29698109e73" />

## 🎓 OOPS & C++ Design

This project includes a `cpp_oops_model` folder. This folder is not part of the production code but is used to model the system's core logic (like `User` and `Blog`) using C++ and Object-Oriented principles (Classes, Encapsulation, Composition).

It serves as a conceptual blueprint to demonstrate how the JavaScript Mongoose schemas are based on a formal OOP design.
