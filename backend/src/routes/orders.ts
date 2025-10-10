import express from 'express';
import { getAll } from '../controllers/orders';
const router = express.Router();
router.get('/', getAll);
export default router;
