import Media from '../models/Media';
export const getAll = async (req: any, res: any) => {
  try {
    const files = await Media.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch media' });
  }
};
