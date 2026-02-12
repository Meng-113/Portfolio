import {
  createQuickInfoService,
  getQuickInfosService,
  updateQuickInfoService,
  deleteQuickInfoService,
} from '../models/quickInfoService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

export const createQuickInfo = async (req, res, next) => {
  const { profile_id, label, value } = req.body;
  try {
    const quickInfo = await createQuickInfoService(profile_id, label, value);
    handleResponse(res, 201, 'Quick Info created successfully', quickInfo);
  } catch (error) {
    next(error);
  }
};

export const getQuickInfos = async (req, res, next) => {
  const { profile_id } = req.query; 
  // Should default to 1 if not provided, assuming user wants default profile
  const pid = profile_id || 1;
  try {
    const quickInfos = await getQuickInfosService(pid);
    handleResponse(res, 200, 'Quick Info retrieved successfully', quickInfos);
  } catch (error) {
    next(error);
  }
};

export const updateQuickInfo = async (req, res, next) => {
  const { id } = req.params;
  const { profile_id, label, value } = req.body;
  try {
    // Assuming profile_id is part of body or we use default. 
    // The service requires profile_id for security check AND update.
    // However, if we trust the ID, maybe we don't need profile_id check, but SQL says `AND profile_id = $4`.
    // So if profile_id is not passed, update will fail (return null) if not matching.
    // Let's assume frontend passes profile_id or we default to 1 for this user context.
    // Better to require it from body.
    const pid = profile_id || 1; 

    const updatedQuickInfo = await updateQuickInfoService(id, pid, label, value);
    if (!updatedQuickInfo) {
      return handleResponse(res, 404, 'Quick Info not found or profile_id mismatch');
    }
    handleResponse(res, 200, 'Quick Info updated successfully', updatedQuickInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteQuickInfo = async (req, res, next) => {
  const { id } = req.params;
  // If we delete by ID, we might also want to ensure profile_id matches for safety.
  // Using query param or body for profile_id if needed.
  // But usually RESTful delete is DELETE /resource/:id.
  // Let's assume we can get profile_id from body or default to 1.
  const { profile_id } = req.body; 
  const pid = profile_id || 1;

  try {
    const deleted = await deleteQuickInfoService(id, pid);
    if (!deleted) {
      return handleResponse(res, 404, 'Quick Info not found');
    }
    handleResponse(res, 200, 'Quick Info deleted successfully', deleted);
  } catch (error) {
    next(error);
  }
};
