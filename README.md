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
DATABASE_URL="postgresql://user:password@localhost:5432/ai_learning_db"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3000
```

## 📚 API Endpoints

### Interactive API Documentation
**Swagger UI available at:** `http://localhost:3000/api-docs`

### Users
- `POST /users` - Create new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Categories
- `GET /categories` - Get all categories with subcategories
- `POST /categories/seed` - Seed initial categories

### Prompts
- `POST /prompts` - Create new prompt and generate lesson
- `GET /prompts/user/:userId` - Get user's learning history

## 🎯 Features

- ✅ User registration with name and phone
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

1. Phone numbers are 10 digits
2. OpenAI API is used for lesson generation (can be mocked)
3. PostgreSQL is the primary database
4. No authentication required for MVP (can be added)
5. Admin dashboard is publicly accessible (should add auth in production)

## 🎨 Example Use Case

1. **Israel** visits the platform
2. He registers with his name and phone number
3. He selects **Science** → **Space**
4. He enters: "Teach me about black holes"
5. The AI generates a comprehensive lesson
6. He can view all his past lessons in the history section
7. Admin can see all users and their learning activity

## 🔮 Future Enhancements

- JWT authentication
- User profiles with avatars
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
