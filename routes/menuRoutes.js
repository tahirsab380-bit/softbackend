import express from 'express';
import MenuItem from '../models/MenuItem.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const items = await MenuItem.find().populate('category');
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
});

export default router;