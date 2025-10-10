import express from 'express';
import { getAll } from '../controllers/categories';
const router = express.Router();
router.get('/', getAll);
export default router;
