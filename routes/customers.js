// routes/customers.js
import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

// GET customers (phone سے search کے لیے)
router.get('/', async (req, res) => {
  try {
    const { phone } = req.query;
    if (phone) {
      const customer = await Customer.find({ phone });
      return res.json(customer);
    }
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update customer
router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;