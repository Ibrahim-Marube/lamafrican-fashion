import express from 'express';
import { getAll } from '../controllers/customers';
const router = express.Router();
router.get('/', getAll);
export default router;
