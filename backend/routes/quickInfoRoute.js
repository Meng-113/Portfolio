import express from 'express';
import {
  createQuickInfo,
  getQuickInfos,
  updateQuickInfo,
  deleteQuickInfo,
} from '../controllers/quickInfoController.js';

const router = express.Router();

router.post('/quickinfo', createQuickInfo);
router.get('/quickinfo', getQuickInfos);
router.put('/quickinfo/:id', updateQuickInfo);
router.delete('/quickinfo/:id', deleteQuickInfo);

export default router;