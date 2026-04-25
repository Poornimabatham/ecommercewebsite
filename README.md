# 💰 Expense Tracker - Backend

## 🔗 Live URL
- **Backend:** https://expense-tracker-62te.vercel.app

## ⚙️ Setup
```bash
npm install
cp .env.example .env
npm run dev


🔐 Environment Variables
Variable	Description
PORT	Server port
MONGO_URI	MongoDB Atlas connection string
JWT_SECRET	Secret key for JWT

📡 API Endpoints
Method	Endpoint	Auth	Description
POST	/api/auth/register	No	Register user
POST	/api/auth/login	No	Login user
GET	/api/expenses	Yes	Get all expenses
POST	/api/expenses	Yes	Create expense
PUT	/api/expenses/:id	Yes	Update expense
DELETE	/api/expenses/:id	Yes	Delete expense
GET	/api/expenses/summary	Yes	Dashboard summary

🧪 Test Credentials


 Test Credentials
Email:test@gmail.com
Password: 123456