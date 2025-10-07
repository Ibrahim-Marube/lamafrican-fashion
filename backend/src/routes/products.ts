import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/products';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
