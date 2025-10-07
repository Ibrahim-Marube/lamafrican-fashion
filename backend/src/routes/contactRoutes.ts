import { Router } from 'express';
import Contact from '../models/Contact';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save contact' });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.query;
    await Contact.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete contact' });
  }
});

export default router;
