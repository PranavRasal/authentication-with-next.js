# 🔐 Authentication with Next.js

A modern authentication system built with **Next.js**, featuring secure user registration, login, JWT-based authentication, protected routes, and MongoDB integration.

## 🚀 Features

* 🔑 User Registration
* 🔐 Secure User Login
* 🍪 JWT Authentication using HTTP-only Cookies
* 🛡️ Protected Routes
* 👤 User Session Management
* 🗄️ MongoDB Database Integration
* ⚡ Next.js App Router
* 📱 Responsive UI
* ✅ Form Validation
* 🚪 Logout Functionality

---
## 📸 Screenshots

### 🔑 Login Page

<img width="1919" height="1076" alt="Screenshot 2026-07-02 192552" src="https://github.com/user-attachments/assets/d35b6ec7-f84d-4acb-9f33-3de9e2f30f7c" />


---

### 📝 Sign Up Page

<img width="1919" height="1077" alt="Screenshot 2026-07-02 192605" src="https://github.com/user-attachments/assets/1cdbc0c5-e299-44da-9cac-a96e4e6c04a9" />


---

### 👤 Profile Page

<img width="1919" height="1079" alt="Screenshot 2026-07-02 200348" src="https://github.com/user-attachments/assets/0e6e1f04-b2ca-4710-820b-f27f1cffe257" />


---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React
* **Backend:** Next.js API Routes
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)
* **Password Hashing:** bcrypt
* **Styling:** Tailwind CSS
* **Language:** JavaScript / TypeScript

---

## 📂 Project Structure

```bash
authentication-with-next.js/
│── app/
│── components/
│── lib/
│── models/
│── api/
│── public/
│── middleware.js
│── package.json
│── README.md
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/PranavRasal/authentication-with-next.js.git
```

Navigate to the project directory:

```bash
cd authentication-with-next.js
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string

TOKEN_SECRET=your_jwt_secret

DOMAIN=http://localhost:3000
```

Replace the values with your own credentials.

---

## ▶️ Run the Project

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🔒 Authentication Flow

1. User signs up with email and password.
2. Password is securely hashed before storing in MongoDB.
3. User logs in with valid credentials.
4. A JWT token is generated and stored in an HTTP-only cookie.
5. Protected routes verify the JWT before granting access.
6. User can securely log out by clearing the authentication cookie.


---

## 📌 Future Improvements

* Google OAuth
* GitHub OAuth
* Email Verification
* Forgot Password
* Reset Password
* Two-Factor Authentication (2FA)
* Role-Based Access Control (RBAC)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Pranav Rasal**

* GitHub: https://github.com/PranavRasal

If you found this project helpful, consider giving it a ⭐ on GitHub.

