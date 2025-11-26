import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [PrismaModule, IssueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
