import express from 'express';
import {
  createSkillImage,
  getSkillImages,
  deleteSkillImage,
} from '../controllers/skillController.js';

const router = express.Router();

router.post('/skill-image', createSkillImage);
router.get('/skill-image', getSkillImages);
router.delete('/skill-image/:id', deleteSkillImage);

export default router;
