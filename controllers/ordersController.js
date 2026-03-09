// controllers/ordersController.js
import Order from '../models/Order.js';  // اپنا path درست کر لو

// GET all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('table', 'tableNumber status')         // table کی details
      .populate('customer', 'name phone address');     // ← یہ لازمی ہے! customer کی name/phone وغیرہ آئے گی

    res.status(200).json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// POST create new order
export const createOrder = async (req, res) => {
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

    // Save کے بعد populate کر کے response بھیجو
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('table', 'tableNumber status')
      .populate('customer', 'name phone address');

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error('Create order error:', err);
    res.status(400).json({ message: err.message || 'Failed to create order' });
  }
};

// Optional: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('customer', 'name phone address');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};