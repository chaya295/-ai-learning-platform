import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { phone: createUserDto.phone },
    });

    if (existing) {
      throw new ConflictException('Phone number already registered');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        phone: createUserDto.phone,
        password: hashedPassword,
      },
    });

    // Don't return password
    const { password, ...result } = user;
    return result;
  }

  async findAll(search?: string, sortBy?: string) {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as any } },
            { phone: { contains: search } },
          ],
        }
      : {};

    const orderBy: any = {};
    if (sortBy === 'name') orderBy.name = 'asc';
    else if (sortBy === 'id') orderBy.id = 'asc';
    else orderBy.name = 'asc';

    return this.prisma.user.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        prompts: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateRole(id: number, role: 'USER' | 'ADMIN') {
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getUserHistory(userId: number) {
    return this.prisma.prompt.findMany({
      where: { userId },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
