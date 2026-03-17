import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectingString = process.env.DATABASE_URL || "file:./dev.db";

const globalForPrisma = globalThis as any;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: connectingString }),
  });

if (process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}


export default prisma;




