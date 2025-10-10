import Inquiry from '../models/Inquiry';
export const getAll = async (req: any, res: any) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
};
