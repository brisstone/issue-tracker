import { ApiProperty } from '@nestjs/swagger';
import { IssueDto } from './issue.dto';

export class PaginatedIssuesDto {
  @ApiProperty({ type: () => [IssueDto] })
  data: IssueDto[];
  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}
