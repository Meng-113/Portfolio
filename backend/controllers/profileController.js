import {
  getProfileService,
  updateProfileService,
} from '../models/profileService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await getProfileService(id);
    if (!profile) {
      return handleResponse(res, 404, 'Profile not found');
    }
    handleResponse(res, 200, 'Profile retrieved successfully', profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    title,
    location,
    about_title,
    intro,
    about,
    contact_detail,
    contact_email,
  } = req.body;
  try {
    const updatedProfile = await updateProfileService(
      id,
      name,
      title,
      location,
      about_title,
      intro,
      about,
      contact_detail,
      contact_email,
    );
    handleResponse(res, 200, 'Profile updated successfully', updatedProfile);
  } catch (error) {
    next(error);
  }
};
