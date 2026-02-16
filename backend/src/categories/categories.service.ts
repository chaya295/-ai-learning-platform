import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
  }

  async seedCategories() {
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
      const category = await this.prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: { name: cat.name },
      });

      for (const subName of cat.subCategories) {
        await this.prisma.subCategory.upsert({
          where: { id: 0 },
          update: {},
          create: {
            name: subName,
            categoryId: category.id,
          },
        });
      }
    }

    return { message: 'Categories seeded successfully' };
  }
}
