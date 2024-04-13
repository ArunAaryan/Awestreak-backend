import { Injectable } from '@nestjs/common';
import { Prisma, Log } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LogCreateInput): Promise<Log> {
    return await this.prisma.log.create({ data });
  }

  async findById(id: string): Promise<Log | null> {
    return await this.prisma.log.findUnique({ where: { id } });
  }

  async findAll(): Promise<Log[]> {
    return await this.prisma.log.findMany();
  }

  async update(id: string, data: Prisma.LogUpdateInput): Promise<Log> {
    return await this.prisma.log.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Log> {
    return await this.prisma.log.delete({ where: { id } });
  }
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LogWhereUniqueInput;
    where?: Prisma.LogWhereInput;
    orderBy?: Prisma.LogOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.log.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
