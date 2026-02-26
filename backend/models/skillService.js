import prisma from '../config/prisma.js';

export const createSkillImageService = async (profile_id, image_url) => {
  return prisma.skillImage.create({
    data: {
      profile_id: Number(profile_id),
      image_url,
    },
  });
};

export const getSkillImagesService = async (profile_id) =>
  prisma.skillImage.findMany({
    where: { profile_id: Number(profile_id) },
    orderBy: [{ sort_order: 'asc' }, { id: 'asc' }],
  });

export const deleteSkillImageService = async (id, profile_id) => {
  const existing = await prisma.skillImage.findFirst({
    where: { id: Number(id), profile_id: Number(profile_id) },
  });

  if (!existing) return null;

  await prisma.skillImage.delete({
    where: { id: Number(id) },
  });

  return existing;
};
