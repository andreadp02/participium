import prisma from '../prisma/client';

const findAll = async () => {
  return prisma.user.findMany();
};

const create = async (data: { name: string; email: string }) => {
  return prisma.user.create({ data });
};

export default { findAll, create };