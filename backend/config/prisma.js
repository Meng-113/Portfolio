import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const buildDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const user = process.env.DB_USER;
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;
  const password = process.env.DB_PASSWORD ?? '';
  const port = process.env.DB_PORT ?? '5432';

  if (!user || !host || !database) return undefined;

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(String(password));

  return `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
};

const prisma =
  globalThis.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: buildDatabaseUrl() },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
