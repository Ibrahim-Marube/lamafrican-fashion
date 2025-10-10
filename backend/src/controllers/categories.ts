import Category from '../models/Category';
export const getAll = async (req: any, res: any) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};
