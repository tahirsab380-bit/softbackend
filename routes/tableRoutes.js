import express from 'express';
import Table from '../models/Table.js';
const router = express.Router();

router.get('/', async (req, res) => res.json(await Table.find()));
router.post('/', async (req, res) => {
  const table = new Table(req.body);
  await table.save();
  res.status(201).json(table);
});
router.patch('/:id', async (req, res) => {
  const table = await Table.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(table);
});

export default router;