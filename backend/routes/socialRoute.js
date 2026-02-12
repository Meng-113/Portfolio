import express from 'express';
import {
  createSocial,
  getSocials,
  updateSocial,
  deleteSocial,
} from '../controllers/socialController.js';

const router = express.Router();

router.post('/social', createSocial);
router.get('/social', getSocials);
router.put('/social/:id', updateSocial);
router.delete('/social/:id', deleteSocial);

export default router;
