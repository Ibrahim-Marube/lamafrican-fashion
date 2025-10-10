import CustomOrder from '../models/CustomOrder';
export const getAll = async (req: any, res: any) => {
  try {
    const orders = await CustomOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch custom orders' });
  }
};
