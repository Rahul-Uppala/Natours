# 🌍 Natours – Tour Booking Web Application

Natours is a full-stack web application that allows users to explore, book, and manage tours seamlessly. Built with modern technologies, it demonstrates real-world backend architecture, authentication, payments, and API design.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User signup & login (JWT-based)
- Secure password hashing
- Role-based access control (admin, guide, user)

### 🧭 Tour Management

- Create, update, delete tours (Admin/Guide)
- Advanced filtering, sorting, pagination
- Geospatial queries (Mapbox integration)

### 💳 Booking & Payments

- Stripe Checkout integration
- Secure payment processing
- Automatic booking creation after payment

### 👤 User Profile

- Update profile data & password
- Upload profile photo
- View booked tours ("My Tours")

### 📩 Email System

- Welcome emails
- Password reset emails
- Nodemailer + SendGrid integration

### 🗺️ Map Integration

- Interactive maps using Mapbox
- Display tour locations visually

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose

### Frontend

- Pug (Template Engine)
- Vanilla JavaScript (ES6+)
- Parcel (Bundler)

### Integrations

- Stripe (Payments)
- Mapbox (Maps)
- Nodemailer / SendGrid (Emails)

---

## 📂 Project Structure

```
Natours/
│── controllers/       # Route handlers
│── models/            # Mongoose schemas
│── routes/            # Express routes
│── views/             # Pug templates
│── public/            # Static files (CSS, JS, images)
│── utils/             # Utility functions
│── dev-data/          # Sample data
│── app.js             # Express app setup
│── server.js          # Server entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/natours.git
cd natours
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `config.env` file:

```env
NODE_ENV=development
PORT=3000

DATABASE=your_mongodb_connection
DATABASE_PASSWORD=your_password

JWT_SECRET=your_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

STRIPE_SECRET_KEY=your_stripe_secret_key

EMAIL_USERNAME=your_email_user
EMAIL_PASSWORD=your_email_pass
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port

EMAIL_FROM=your_email
```

---

### 4️⃣ Run the app

```bash
npm run dev
```

Visit:

```
http://127.0.0.1:3000
```

---

## 💡 Key Concepts Demonstrated

- MVC Architecture
- RESTful API Design
- Middleware chaining
- Error handling (Global Error Controller)
- Authentication with JWT
- File uploads (Multer + Sharp)
- Payment workflow (Stripe)
- Security best practices (Helmet, CSP, etc.)

---

## 📸 Screenshots (Optional)

_Add screenshots here (Home, Tour page, Checkout, Profile, etc.)_

---

## 📌 Future Improvements

- Booking history dashboard
- Reviews & ratings system
- Admin analytics panel
- Deployment (AWS / Render / Vercel)
- Webhooks for Stripe payments

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rahul Uppala**
Aspiring Software Engineer 🚀

---

⭐ If you like this project, don’t forget to star the repo!
