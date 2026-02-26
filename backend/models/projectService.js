import prisma from '../config/prisma.js';

export const createProjectService = async (
  profile_id,
  category,
  title,
  description,
  tech_stack,
  github_url,
  live_url,
) => {
  return prisma.project.create({
    data: {
      profile_id: Number(profile_id),
      category,
      title,
      description,
      tech_stack: tech_stack ?? [],
      github_url,
      live_url,
    },
  });
};

export const getProjectsService = async (profile_id) =>
  prisma.project.findMany({
    where: { profile_id: Number(profile_id) },
    orderBy: [{ sort_order: 'asc' }, { id: 'asc' }],
  });

export const updateProjectService = async (
  id,
  profile_id,
  category,
  title,
  description,
  tech_stack,
  github_url,
  live_url,
) => {
  const updated = await prisma.project.updateMany({
    where: { id: Number(id), profile_id: Number(profile_id) },
    data: {
      category,
      title,
      description,
      tech_stack: tech_stack ?? [],
      github_url,
      live_url,
    },
  });

  if (!updated.count) return null;

  return prisma.project.findUnique({
    where: { id: Number(id) },
  });
};

export const deleteProjectService = async (id, profile_id) => {
  const existing = await prisma.project.findFirst({
    where: { id: Number(id), profile_id: Number(profile_id) },
  });

  if (!existing) return null;

  await prisma.project.delete({
    where: { id: Number(id) },
  });

  return existing;
};
