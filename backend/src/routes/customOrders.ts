import express from 'express';
import { getAll } from '../controllers/customOrders';
const router = express.Router();
router.get('/', getAll);
export default router;
