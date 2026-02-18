# Detailed Setup Guide - AI Learning Platform

## Prerequisites

- Node.js version 18 or higher
- Docker Desktop installed and running
- Code editor (VS Code recommended)
- OpenAI account with API Key

## Step 1: Download the Project

```bash
git clone <repository-url>
cd ai-learning-platform
```

## Step 2: Start the Database

```bash
docker-compose up -d
```

Verify the database is running:
```bash
docker ps
```

You should see: `ai_learning_db`

## Step 3: Backend Setup

### 3.1 Install Dependencies
```bash
cd backend
npm install
```

### 3.2 Environment Variables Setup
```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenAI API Key:
```
DATABASE_URL="postgresql://user:password@localhost:5433/ai_learning_db"
OPENAI_API_KEY="sk-your-actual-api-key-here"
PORT=3000
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### 3.3 Run Migrations
```bash
npx prisma migrate dev
npx prisma generate
```

### 3.4 Seed Initial Data
```bash
npx prisma db seed
```

Or via API (after starting the server):
```bash
curl -X POST http://localhost:3000/categories/seed
```

## Step 4: Frontend Setup

```bash
cd ../frontend
npm install
```

The `.env` file is already configured with:
```
REACT_APP_API_URL=http://localhost:3000
```

## Step 5: Start the Servers

Open 2 terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Step 6: Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api-docs

## Step 7: Create First User

1. Open http://localhost:3001
2. Click "Don't have an account? Register here"
3. Fill in:
   - Name: Israel Cohen
   - Phone: 0501234567
   - Password: MyPass123
4. Click "Register"
5. Login with the phone and password

## Step 8: Create Admin User

Via Prisma Studio:
```bash
cd backend
npx prisma studio
```

Or via SQL:
```sql
UPDATE users SET role = 'ADMIN' WHERE phone = '0501234567';
```

## Common Issues

### Port 5433 is busy
```bash
docker-compose down
docker-compose up -d
```

### Prisma Error
```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

### Frontend can't connect to Backend
Check that:
1. Backend is running on port 3000
2. Frontend `.env` file contains: `REACT_APP_API_URL=http://localhost:3000`

## Useful Commands

```bash
# View Docker logs
docker-compose logs -f

# Stop database
docker-compose down

# Delete data and restart
docker-compose down -v
docker-compose up -d

# Prisma Studio (Database UI)
cd backend
npx prisma studio
```

## Project Structure

```
ai-learning-platform/
├── backend/              # NestJS Backend
│   ├── src/
│   │   ├── auth/        # Authentication system + JWT
│   │   ├── users/       # User management
│   │   ├── categories/  # Categories and subcategories
│   │   ├── prompts/     # AI questions and responses
│   │   └── ai/          # OpenAI service
│   └── prisma/          # Database schema
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # Components
│   │   ├── pages/       # Pages
│   │   ├── api/         # API Client
│   │   └── contexts/    # AuthContext
└── docker-compose.yml   # PostgreSQL configuration
```

## System Features

### Security
- ✅ Encrypted passwords with bcrypt
- ✅ JWT tokens valid for 7 days
- ✅ Role-based access (USER/ADMIN)
- ✅ Protected routes

### API Endpoints
- `POST /auth/login` - Login
- `POST /users` - Registration
- `GET /users` - List users (ADMIN)
- `GET /categories` - Categories
- `POST /prompts` - Submit question
- `GET /prompts/user/:userId` - History

### Frontend Pages
- Registration/Login page
- Dashboard - Submit new questions
- My History - My learning history
- Admin Dashboard - Management (ADMIN only)

---

**Good luck! 🚀**
