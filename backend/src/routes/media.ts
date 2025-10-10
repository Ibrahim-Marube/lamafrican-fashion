import express from 'express';
import { getAll } from '../controllers/media';
const router = express.Router();
router.get('/', getAll);
export default router;
