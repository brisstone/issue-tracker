import { ApiProperty } from '@nestjs/swagger';
import { IssueStatus } from '@prisma/client';

export class IssueDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: IssueStatus })
  status: IssueStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}