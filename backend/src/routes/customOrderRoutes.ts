
import { Router } from 'express';
import CustomOrder from '../models/CustomOrder';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const order = await CustomOrder.create({ ...req.body, status: 'pending' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await CustomOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { id, status } = req.body;
    const order = await CustomOrder.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update order' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.query;
    await CustomOrder.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete order' });
  }
});

export default router;
