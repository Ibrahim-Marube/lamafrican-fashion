import Customer from '../models/Customer';
export const getAll = async (req: any, res: any) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};
