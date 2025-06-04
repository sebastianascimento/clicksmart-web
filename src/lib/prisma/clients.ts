import { PrismaClient } from '@prisma/client';

// Correctly extend the global namespace
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create or reuse the Prisma client instance
export const prisma = global.prisma || new PrismaClient();

// In development, attach the instance to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}