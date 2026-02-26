import prisma from '../config/prisma.js';

export const createSocialService = async (profile_id, name, url, url_image) => {
  return prisma.socialLink.create({
    data: {
      profile_id: Number(profile_id),
      name,
      url,
      url_image,
    },
  });
};

export const getSocialsService = async (profile_id) =>
  prisma.socialLink.findMany({
    where: { profile_id: Number(profile_id) },
    orderBy: [{ sort_order: 'asc' }, { id: 'asc' }],
  });

export const updateSocialService = async (id, profile_id, name, url, url_image) => {
  const updated = await prisma.socialLink.updateMany({
    where: { id: Number(id), profile_id: Number(profile_id) },
    data: { name, url, url_image },
  });

  if (!updated.count) return null;

  return prisma.socialLink.findUnique({
    where: { id: Number(id) },
  });
};

export const deleteSocialService = async (id, profile_id) => {
  const existing = await prisma.socialLink.findFirst({
    where: { id: Number(id), profile_id: Number(profile_id) },
  });

  if (!existing) return null;

  await prisma.socialLink.delete({
    where: { id: Number(id) },
  });

  return existing;
};
