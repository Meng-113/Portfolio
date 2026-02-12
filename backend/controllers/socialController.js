import {
  createSocialService,
  getSocialsService,
  updateSocialService,
  deleteSocialService,
} from '../models/socialService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

export const createSocial = async (req, res, next) => {
  const { profile_id, name, url, url_image } = req.body;
  const pid = profile_id || 1;
  try {
    const social = await createSocialService(pid, name, url, url_image);
    handleResponse(res, 201, 'Social created successfully', social);
  } catch (error) {
    next(error);
  }
};

export const getSocials = async (req, res, next) => {
  const { profile_id } = req.query;
  const pid = profile_id || 1;
  try {
    const socials = await getSocialsService(pid);
    handleResponse(res, 200, 'Socials retrieved successfully', socials);
  } catch (error) {
    next(error);
  }
};

export const updateSocial = async (req, res, next) => {
  const { id } = req.params;
  const { profile_id, name, url, url_image } = req.body;
  const pid = profile_id || 1;
  try {
    const social = await updateSocialService(id, pid, name, url, url_image);
    if (!social) {
      return handleResponse(res, 404, 'Social not found');
    }
    handleResponse(res, 200, 'Social updated successfully', social);
  } catch (error) {
    next(error);
  }
};

export const deleteSocial = async (req, res, next) => {
  const { id } = req.params;
  const { profile_id } = req.body;
  const pid = profile_id || 1;
  try {
    const social = await deleteSocialService(id, pid);
    if (!social) {
      return handleResponse(res, 404, 'Social not found');
    }
    handleResponse(res, 200, 'Social deleted successfully', social);
  } catch (error) {
    next(error);
  }
};
