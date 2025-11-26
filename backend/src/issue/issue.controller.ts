import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiOkResponse({ description: 'List of issues returned successfully' })
  findAll() {
    return this.issueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one issues' })
  @ApiOkResponse({ description: 'Issue returned successfully' })
  @ApiNotFoundResponse({ description: 'Issue not found' })
  findOne(@Param('id') id: string) {
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
