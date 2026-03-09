// routes/orders.js
import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET all orders - customer details کے ساتھ
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('table', 'tableNumber status')          // table کی details
      .populate('customer', 'name phone address')       // ← یہ لازمی ہے! customer name/phone آئے گا
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { table, customer, items, total, status } = req.body;

    // اگر customer ID نہیں آیا تو error
    if (!customer) {
      return res.status(400).json({ message: 'Customer ID is required' });
    }

    const newOrder = new Order({
      table,
      customer,          // ← ID یہاں save ہو رہی ہے
      items,
      total,
      status: status || 'pending'
    });

    await newOrder.save();

    // Save کے بعد populate کر کے response بھیجو (customer details کے ساتھ)
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('table', 'tableNumber status')
      .populate('customer', 'name phone address');

    // table کو occupied mark کرو
    await import('../models/Table.js').then(m => {
      m.default.findByIdAndUpdate(table, { status: 'occupied' });
    });

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(400).json({ message: err.message || 'Failed to create order' });
  }
});

// PATCH update order (status change وغیرہ)
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('table', 'tableNumber status')
      .populate('customer', 'name phone address');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // اگر status paid ہو گئی تو table available mark کرو
    if (order.status === 'paid') {
      await import('../models/Table.js').then(m => {
        m.default.findByIdAndUpdate(order.table, { status: 'available' });
      });
    }

    res.json(order);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;