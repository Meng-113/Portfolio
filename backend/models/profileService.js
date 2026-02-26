import prisma from '../config/prisma.js';

export const getProfileService = async (id) => {
  return prisma.profile.findUnique({
    where: { id: Number(id) },
  });
};

export const updateProfileService = async (
  id,
  name,
  title,
  location,
  about_title,
  intro,
  about,
  contact_detail,
  contact_email,
  url_profile,
) => {
  try {
    return await prisma.profile.update({
      where: { id: Number(id) },
      data: {
        name,
        title,
        location,
        about_title,
        intro,
        about,
        contact_detail,
        contact_email,
        url_profile,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
};
