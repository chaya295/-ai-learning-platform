import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const CATEGORIES = [
  { name: 'Science', subs: ['Physics', 'Chemistry', 'Biology', 'Space', 'Earth Science'] },
  { name: 'Technology', subs: ['Programming', 'AI & ML', 'Cybersecurity', 'Web Development', 'Mobile Apps'] },
  { name: 'Mathematics', subs: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Number Theory'] },
  { name: 'History', subs: ['Ancient History', 'Modern History', 'World Wars', 'Medieval Period', 'Renaissance'] },
  { name: 'Arts', subs: ['Painting', 'Music', 'Literature', 'Theater', 'Film'] },
];

async function seed(prisma: PrismaService) {
  // Admin
  const adminPhone = process.env.ADMIN_PHONE || '0583282265';
  const existing = await prisma.user.findUnique({ where: { phone: adminPhone } });
  if (!existing) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || '789456', 10);
    await prisma.user.create({ data: { name: 'Admin', phone: adminPhone, password: hashed, role: 'ADMIN' } });
    console.log('✅ Admin created');
  }

  // Categories
  const count = await prisma.category.count();
  if (count > 0) return;
  for (const cat of CATEGORIES) {
    const category = await prisma.category.create({ data: { name: cat.name } });
    for (const subName of cat.subs) {
      await prisma.subCategory.create({ data: { name: subName, categoryId: category.id } });
    }
  }
  console.log('✅ Categories seeded');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    /\.onrender\.com$/,
    /\.netlify\.app$/,
  ];

  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL as string);
  }

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('AI Learning Platform API')
    .setDescription('REST API for AI-powered learning platform')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('categories', 'Category and subcategory endpoints')
    .addTag('prompts', 'Lesson generation and history endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const prisma = app.get(PrismaService);
  await seed(prisma);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
  console.log(`API Documentation: http://localhost:${port}/api-docs`);
}

bootstrap();
