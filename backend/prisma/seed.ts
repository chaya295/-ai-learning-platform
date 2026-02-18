import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default admin
  const adminPhone = '0583282265';
  const existing = await prisma.user.findUnique({
    where: { phone: adminPhone },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash('789456', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        phone: adminPhone,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Default admin created');
  } else if (existing.role !== 'ADMIN') {
    await prisma.user.update({
      where: { phone: adminPhone },
      data: { role: 'ADMIN' },
    });
    console.log('✅ Admin role updated');
  } else {
    console.log('✅ Admin already exists');
  }

  // Seed categories
  const categories = [
    {
      name: 'Science',
      subCategories: ['Physics', 'Chemistry', 'Biology', 'Space', 'Earth Science'],
    },
    {
      name: 'Technology',
      subCategories: ['Programming', 'AI & ML', 'Cybersecurity', 'Web Development', 'Mobile Apps'],
    },
    {
      name: 'Mathematics',
      subCategories: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Number Theory'],
    },
    {
      name: 'History',
      subCategories: ['Ancient History', 'Modern History', 'World Wars', 'Medieval Period', 'Renaissance'],
    },
    {
      name: 'Arts',
      subCategories: ['Painting', 'Music', 'Literature', 'Theater', 'Film'],
    },
  ];

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
    });

    for (const subName of cat.subCategories) {
      await prisma.subCategory.upsert({
        where: { id: 0 },
        update: {},
        create: {
          name: subName,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('✅ Categories seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
