import prisma from '../config/prisma.js';

export const createQuickInfoService = async (profile_id, label, value) => {
  return prisma.quickInfo.create({
    data: {
      profile_id: Number(profile_id),
      label,
      value,
    },
  });
};

export const getQuickInfosService = async (profile_id) =>
  prisma.quickInfo.findMany({
    where: { profile_id: Number(profile_id) },
    orderBy: [{ sort_order: 'asc' }, { id: 'asc' }],
  });

export const getQuickInfoByIdService = async (id) =>
  prisma.quickInfo.findUnique({
    where: { id: Number(id) },
  });

export const updateQuickInfoService = async (id, profile_id, label, value) => {
  const updated = await prisma.quickInfo.updateMany({
    where: { id: Number(id), profile_id: Number(profile_id) },
    data: { label, value },
  });

  if (!updated.count) return null;

  return prisma.quickInfo.findUnique({
    where: { id: Number(id) },
  });
};

export const deleteQuickInfoService = async (id, profile_id) => {
  const existing = await prisma.quickInfo.findFirst({
    where: { id: Number(id), profile_id: Number(profile_id) },
  });

  if (!existing) return null;

  await prisma.quickInfo.delete({
    where: { id: Number(id) },
  });

  return existing;
};
