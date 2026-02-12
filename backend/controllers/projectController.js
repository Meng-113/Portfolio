import {
  createProjectService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
} from '../models/projectService.js';

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

export const createProject = async (req, res, next) => {
  const {
    profile_id,
    category,
    title,
    description,
    tech_stack,
    github_url,
    live_url,
  } = req.body;
  try {
    const project = await createProjectService(
      profile_id,
      category,
      title,
      description,
      tech_stack || [], // default to empty array if not provided
      github_url,
      live_url
    );
    handleResponse(res, 201, 'Project created successfully', project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  const { profile_id } = req.query;
  const pid = profile_id || 1;
  try {
    const projects = await getProjectsService(pid);
    handleResponse(res, 200, 'Projects retrieved successfully', projects);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const {
    profile_id,
    category,
    title,
    description,
    tech_stack,
    github_url,
    live_url,
  } = req.body;
  
  try {
    const pid = profile_id || 1; 

    const project = await updateProjectService(
      id,
      pid,
      category,
      title,
      description,
      tech_stack || [],
      github_url,
      live_url
    );

    if (!project) {
        return handleResponse(res, 404, 'Project not found');
    }
    handleResponse(res, 200, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const { profile_id } = req.body; 
  const pid = profile_id || 1;

  try {
    const project = await deleteProjectService(id, pid);
    if (!project) {
        return handleResponse(res, 404, 'Project not found');
    }
    handleResponse(res, 200, 'Project deleted successfully', project);
  } catch (error) {
    next(error);
  }
};
