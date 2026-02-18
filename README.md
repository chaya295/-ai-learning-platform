# AI-Driven Learning Platform

A full-stack learning platform that allows users to learn topics using AI-generated lessons.

## 🚀 Technologies Used

### Backend
- **Node.js** with **NestJS** framework
- **Prisma ORM** with **PostgreSQL**
- **OpenAI GPT API** for lesson generation
- **TypeScript** for type safety
- **Class Validator** for input validation

### Frontend
- **React** with **TypeScript**
- **Chakra UI** for modern UI components
- **Axios** for API calls
- **React Router** for navigation

### DevOps
- **Docker Compose** for database setup
- **ESLint** and **Prettier** for code quality

## 📁 Project Structure

```
ai-learning-platform/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── users/       # Users module
│   │   ├── categories/  # Categories module
│   │   ├── prompts/     # Prompts module
│   │   ├── ai/          # AI service integration
│   │   └── prisma/      # Prisma service
│   ├── prisma/          # Database schema
│   └── package.json
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API client
│   │   └── types/       # TypeScript types
│   └── package.json
├── docker-compose.yml   # Docker configuration
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker and Docker Compose
- OpenAI API key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-learning-platform
```

### 2. Setup Database

```bash
docker-compose up -d
```

### 3. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

Backend will run on `http://localhost:3000`

### 4. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3001`

### 5. Seed Initial Data

```bash
curl -X POST http://localhost:3000/categories/seed
```

## 🔑 Environment Variables

### Backend (.env)

```
DATABASE_URL="postgresql://user:password@localhost:5433/ai_learning_db"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3000
```

## 📚 API Endpoints

### Interactive API Documentation
**Swagger UI available at:** `http://localhost:3000/api-docs`

### Authentication
- `POST /auth/login` - Login with phone and password (returns JWT token)

### Users
- `POST /users` - Register new user (name, phone, password)
- `GET /users` - Get all users (requires ADMIN role)
- `GET /users/:id` - Get user by ID (requires authentication)
- `PATCH /users/:id/role` - Update user role (requires ADMIN role)

### Categories
- `GET /categories` - Get all categories with subcategories
- `POST /categories/seed` - Seed initial categories

### Prompts
- `POST /prompts` - Create new prompt and generate lesson (requires authentication)
- `GET /prompts/user/:userId` - Get user's learning history (requires authentication)
- `GET /prompts` - Get all prompts (requires ADMIN role)

## 🎯 Features

- ✅ User registration with name, phone, and password
- ✅ **JWT-based authentication** with bcrypt password hashing
- ✅ Role-based access control (USER/ADMIN)
- ✅ Category and subcategory selection
- ✅ AI-powered lesson generation using OpenAI
- ✅ Learning history tracking
- ✅ Admin dashboard to view all users and their prompts
- ✅ Clean architecture with separated layers
- ✅ Input validation and error handling
- ✅ TypeScript for type safety
- ✅ Responsive UI with Chakra UI
- ✅ **Swagger/OpenAPI documentation** at `/api-docs`
- ✅ Docker Compose for easy database setup
- ✅ Environment variable management

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 🚢 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Run migrations: `npx prisma migrate deploy`
3. Start server: `npm run start:prod`

### Frontend (Vercel/Netlify)
1. Set `REACT_APP_API_URL` to your backend URL
2. Build: `npm run build`
3. Deploy the `build` folder

## 💡 Assumptions

1. Phone numbers are unique identifiers (10 digits)
2. OpenAI API is used for lesson generation (with fallback mock)
3. PostgreSQL is the primary database (port 5433)
4. JWT tokens are valid for 7 days
5. Passwords are hashed with bcrypt (10 rounds)
6. Default user role is USER, can be upgraded to ADMIN
7. Admin features require ADMIN role

## 🎨 Example Use Case

1. **Israel** visits the platform
2. He registers with his name, phone number, and password
3. He logs in with his phone and password
4. He selects **Science** → **Space**
5. He enters: "Teach me about black holes"
6. The AI generates a comprehensive lesson
7. He can view all his past lessons in the "My History" section
8. He can logout securely
9. Admin users can access the admin dashboard to see all users and their learning activity

## 🔮 Future Enhancements

- User profiles with avatars
- Password reset functionality
- Lesson bookmarking and favorites
- Search and filter in history
- Export lessons as PDF
- Real-time notifications
- Progress tracking and analytics
- Social features (share lessons)

## 👨‍💻 Development

```bash
# Run backend in dev mode
cd backend && npm run start:dev

# Run frontend in dev mode
cd frontend && npm start

# Format code
npm run format

# Lint code
npm run lint
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for learning**

## \ud83d\udcd6 Additional Documentation

For detailed step-by-step setup instructions in Hebrew, see [SETUP-GUIDE.md](./SETUP-GUIDE.md)

---

**Note:** This project includes Swagger/OpenAPI documentation. After starting the backend, visit `http://localhost:3000/api-docs` to explore and test all API endpoints interactively.
