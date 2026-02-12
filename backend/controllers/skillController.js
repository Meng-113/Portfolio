import {
  createSkillImageService,
  getSkillImagesService,
  deleteSkillImageService,
} from '../models/skillService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

const getProfileId = (value) => value || 1;

export const createSkillImage = async (req, res, next) => {
  const { profile_id, image_url } = req.body;

  try {
    const image = await createSkillImageService(getProfileId(profile_id), image_url);
    handleResponse(res, 201, 'Skill image created successfully', image);
  } catch (error) {
    next(error);
  }
};

export const getSkillImages = async (req, res, next) => {
  const { profile_id } = req.query;

  try {
    const images = await getSkillImagesService(getProfileId(profile_id));
    handleResponse(res, 200, 'Skill images retrieved successfully', images);
  } catch (error) {
    next(error);
  }
};

export const deleteSkillImage = async (req, res, next) => {
  const { id } = req.params;
  const { profile_id } = req.body;

  try {
    const image = await deleteSkillImageService(id, getProfileId(profile_id));
    if (!image) {
      return handleResponse(res, 404, 'Skill image not found');
    }
    handleResponse(res, 200, 'Skill image deleted successfully', image);
  } catch (error) {
    next(error);
  }
};
