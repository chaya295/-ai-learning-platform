# AI-Driven Learning Platform

A full-stack learning platform that allows users to learn topics using AI-generated lessons.

## 🚀 Technologies Used

### Backend
- **Node.js** with **NestJS** framework
- **Prisma ORM** with **PostgreSQL**
- **OpenAI GPT-4o API** for lesson generation
- **TypeScript** for type safety
- **JWT** for authentication
- **bcrypt** for password hashing
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
│   │   ├── auth/        # Authentication module (JWT)
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
│   │   ├── contexts/    # Auth context
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

### Quick Start (Recommended)

**Step 1: Clone and Navigate**
```bash
git clone <your-repo-url>
cd ai-learning-platform
```

**Step 2: Start Database with Docker**
```bash
docker-compose up -d
```
This starts PostgreSQL on port 5433. Verify it's running:
```bash
docker ps
```
You should see `ai-learning-db` container running.

**Step 3: Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY="sk-your-actual-openai-key-here"
```
Then run:
```bash
npx prisma db push
npx prisma generate
npm run start:dev
```
Backend will run on `http://localhost:3000`

**Step 4: Setup Frontend (in a new terminal)**
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3001`

**Step 5: Seed Initial Categories**
```bash
curl -X POST http://localhost:3000/categories/seed
```

**Step 6: Access the Application**
- Frontend: `http://localhost:3001`
- Backend API: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`

### Stopping the Application

```bash
# Stop backend and frontend (Ctrl+C in their terminals)

# Stop Docker database
docker-compose down

# Stop and remove database data
docker-compose down -v
```

## 🔑 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/ai_learning_db"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### Frontend (.env)

```env
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
- `DELETE /prompts/:id` - Delete a lesson (requires authentication)

## 🎯 Features

- ✅ User registration with name, phone, and password
- ✅ **JWT-based authentication** with bcrypt password hashing
- ✅ Role-based access control (USER/ADMIN)
- ✅ Category and subcategory selection
- ✅ AI-powered lesson generation using **OpenAI GPT-4o**
- ✅ Real-time lesson display
- ✅ Learning history tracking
- ✅ Delete lessons from history
- ✅ Admin dashboard to view all users and their prompts
- ✅ Clean architecture with separated layers (Controllers/Services/Models)
- ✅ Input validation and error handling
- ✅ TypeScript for type safety (Frontend & Backend)
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

### Option 1: Render (Recommended)

**Backend:**
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Use the provided `backend/render.yaml` or configure manually:
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `node dist/main.js`
5. Add environment variables:
   - `DATABASE_URL` (from Render PostgreSQL)
   - `OPENAI_API_KEY`
   - `JWT_SECRET`
   - `PORT=3000`

**Frontend:**
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Use the provided `frontend/render.yaml` or configure manually:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL` (your backend URL)

### Option 2: Vercel (Frontend) + Railway (Backend)

**Backend (Railway):**
1. Create new project on Railway
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables

**Frontend (Vercel):**
1. Import project from GitHub
2. Framework: Create React App
3. Root Directory: `frontend`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy

### Option 3: Heroku

**Backend:**
```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set OPENAI_API_KEY=your-key
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

**Frontend:**
```bash
cd frontend
heroku create your-frontend-name
heroku config:set REACT_APP_API_URL=https://your-backend.herokuapp.com
git push heroku main
```

## 🔐 Admin Access

By default, all registered users have the `USER` role. To grant admin access:

**Option 1: Via Prisma Studio**
```bash
cd backend
npx prisma studio
```
Open `http://localhost:5555`, go to the `User` table, find the user and change `role` from `USER` to `ADMIN`.

**Option 2: Via SQL**
```sql
UPDATE "User" SET role = 'ADMIN' WHERE phone = 'your-phone-number';
```

Once set to ADMIN, the user will see the **Admin Dashboard** button in the header after logging in.

## 💡 Assumptions

1. Phone numbers are unique identifiers (10 digits)
2. OpenAI GPT-4o API is used for lesson generation
3. PostgreSQL is the primary database (port 5433)
4. JWT tokens are valid for 7 days
5. Passwords are hashed with bcrypt (10 rounds)
6. Default user role is USER, can be upgraded to ADMIN
7. Admin features require ADMIN role
8. All text is in English for international accessibility

## 🎨 Example Use Case

1. **Israel** visits the platform
2. He creates an account with his name, phone number, and password
3. He signs in with his credentials
4. He selects **Science** → **Space**
5. He enters: "Teach me about black holes"
6. The AI (GPT-4o) generates a comprehensive lesson in real-time
7. He can view all his past lessons in the learning history sidebar
8. He can delete lessons he no longer needs
9. He can logout securely
10. Admin users can access the admin dashboard to see all users and their learning activity

## 🏗️ Architecture

### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Models**: Prisma schema and database models
- **Guards**: JWT authentication and role-based authorization
- **DTOs**: Data validation with class-validator

### Frontend Architecture
- **Pages**: Main application views (Dashboard, Admin)
- **Components**: Reusable UI components (Login, LearningForm, HistoryList)
- **Contexts**: Global state management (AuthContext)
- **API Client**: Centralized Axios instance with interceptors

### Database Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String   @unique
  password  String
  role      Role     @default(USER)
  prompts   Prompt[]
}

model Category {
  id             Int            @id @default(autoincrement())
  name           String
  subCategories  SubCategory[]
  prompts        Prompt[]
}

model SubCategory {
  id          Int       @id @default(autoincrement())
  name        String
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  prompts     Prompt[]
}

model Prompt {
  id            Int         @id @default(autoincrement())
  userId        Int
  categoryId    Int
  subCategoryId Int
  prompt        String
  response      String
  createdAt     DateTime    @default(now())
  user          User        @relation(fields: [userId], references: [id])
  category      Category    @relation(fields: [categoryId], references: [id])
  subCategory   SubCategory @relation(fields: [subCategoryId], references: [id])
}
```

## 🔮 Future Enhancements

- User profiles with avatars
- Password reset functionality
- Lesson bookmarking and favorites
- Search and filter in history
- Export lessons as PDF
- Real-time notifications
- Progress tracking and analytics
- Social features (share lessons)
- Multi-language support

## 👨💍 Development

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

## 🔧 Troubleshooting

### Docker Issues

**Port 5433 already in use:**
```bash
# Check what's using the port
netstat -ano | findstr :5433  # Windows
lsof -i :5433                  # Mac/Linux

# Stop and restart
docker-compose down
docker-compose up -d
```

**Container not starting:**
```bash
# Check logs
docker-compose logs postgres

# Restart
docker-compose restart
```

### Backend Issues

**"Can't reach database server":**
- Verify Docker is running: `docker ps`
- Check DATABASE_URL in `.env`
- Ensure port 5433 is accessible

**"OpenAI API error":**
- Verify OPENAI_API_KEY in `.env`
- Check OpenAI account credits
- Error details shown in lesson response

### Frontend Issues

**"Network Error":**
- Ensure backend runs on port 3000
- Check REACT_APP_API_URL in `.env`
- Verify CORS enabled (default)

**Port conflicts:**
- Frontend: port 3001
- Backend: port 3000
- Database: port 5433

## 📝 License

MIT - See [LICENSE](./LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

**Built with ❤️ for learning**

---

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.
