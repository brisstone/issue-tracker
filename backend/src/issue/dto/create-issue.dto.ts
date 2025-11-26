import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IssueStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateIssueDto {
  
    @ApiProperty({ example: 'Vibration high on pump'})
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ example: "The sensor detected abnormal vibration "})
    @IsString()
    @IsNotEmpty()
    description: string


    @ApiPropertyOptional({
      enum: IssueStatus,
      description: "status of the issue (defaults to OPEN)"
    })
    @IsOptional()
    @IsEnum(IssueStatus)
    status?: IssueStatus
}