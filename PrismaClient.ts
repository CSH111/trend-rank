import { PrismaClient } from "@prisma/client";

// const pr = new PrismaClient({ log: ["error"] });

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ["error"] });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const pr = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = pr;

export { pr };
