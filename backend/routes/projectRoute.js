import express from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/project', createProject);
router.get('/project', getProjects);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

export default router;
