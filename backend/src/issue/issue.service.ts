import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { handlePrismaError } from 'src/common/errors/prisma-error.util';

@Injectable()
export class IssueService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateIssueDto) {
    try {
      return await this.prisma.issue.create({
        data: dto,
      });
    } catch (error) {
      handlePrismaError(error, 'create Issue');
    }
  }

  async findAll() {
    try {
      return await this.prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      handlePrismaError(error, 'Find All Issues');
    }
  }

  async findOne(id: number) {
    try {
      const issue = await this.prisma.issue.findUnique({
        where: { id },
      });

      if (!issue) {
        throw new NotFoundException(`Issue with id ${id} not found`);
      }

      return issue;
    } catch (error) {
      handlePrismaError(error, 'Find One Issue');
    }
  }

  async update(id: number, dto: UpdateIssueDto) {
    try {
      return await this.prisma.issue.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      handlePrismaError(error, 'update Issue');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.issue.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error, 'remove Issue');
    }
  }
}
