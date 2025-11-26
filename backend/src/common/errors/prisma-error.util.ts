import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown, context: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictException(
          `A record already exists that viotates unique constraint ${context}`,
        );
      case 'P2025':
        throw new NotFoundException(`Record not found ${context}`);
    }
  }

  console.error('[Unhandled Prisma Error', error);

  throw new InternalServerErrorException(
    `An unexpected error occured during ${context}`,
  );
}
