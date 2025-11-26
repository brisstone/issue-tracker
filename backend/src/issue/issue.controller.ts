import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Issue } from '@prisma/client';
import { PaginatedIssues } from 'src/types/issues';
import { PaginatedIssuesDto } from './dto/paginated-issues.dto';

@ApiTags('issues')
@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new issue' })
  @ApiCreatedResponse({ description: 'Issue created successfully' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() dto: CreateIssueDto) {
    return this.issueService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all issues' })
  @ApiResponse({
    status: 200,
    type: PaginatedIssuesDto,
  })
  @ApiOkResponse({ description: 'List of issues returned successfully' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'Free-text search across title and description',
    example: 'vibration',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description:
      'Comma-separated list of statuses to filter by (e.g. "OPEN,IN_PROGRESS"). If omitted, all statuses are returned.',
    example: 'OPEN,IN_PROGRESS',
  })
  findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<PaginatedIssues> {
    return this.issueService.findAll({
      searchTerm,
      status,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one issues' })
  @ApiOkResponse({ description: 'Issue returned successfully' })
  @ApiNotFoundResponse({ description: 'Issue not found' })
  findOne(@Param('id') id: string): Promise<Issue> {
    return this.issueService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one issue' })
  @ApiOkResponse({ description: 'Issue updated successfully' })
  @ApiNotFoundResponse({ description: 'Issue not found' })
  update(@Param('id') id: string, @Body() dto: UpdateIssueDto) {
    return this.issueService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one issues' })
  @ApiOkResponse({ description: 'Issue deleted successfully' })
  @ApiNotFoundResponse({ description: 'Issue not found' })
  remove(@Param('id') id: string) {
    return this.issueService.remove(+id);
  }
}
