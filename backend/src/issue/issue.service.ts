import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { handlePrismaError } from '../common/errors/prisma-error.util';
import { Issue, IssueStatus, Prisma } from '@prisma/client';
import { FindAllIssuesParams, PaginatedIssues } from '../types/issues';

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

  async findAll(params: FindAllIssuesParams = {}): Promise<PaginatedIssues> {
    const { searchTerm, status, page = 1, pageSize = 10 } = params;

    try {
      const where: Prisma.IssueWhereInput = {};
      const andConditions: Prisma.IssueWhereInput[] = [];

      if (searchTerm && searchTerm.trim()) {
        const q = searchTerm.trim();
        andConditions.push({
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        });
      }

      // status filter (supports comma-separated list)
      if (status && status.trim()) {
        const statuses = status
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean) as IssueStatus[];

        if (statuses.length === 1) {
          andConditions.push({ status: statuses[0] });
        } else if (statuses.length > 1) {
          andConditions.push({ status: { in: statuses } });
        }
      }

      if (andConditions.length > 0) {
        where.AND = andConditions;
      }

      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const [total, data] = await Promise.all([
        this.prisma.issue.count({ where }),
        this.prisma.issue.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take,
        }),
      ]);

      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      return {
        data,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (error) {
      handlePrismaError(error, 'Find All Issues');
    }
  }

  async findOne(id: number): Promise<Issue> {
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

  async update(id: number, dto: UpdateIssueDto): Promise<Issue> {
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
