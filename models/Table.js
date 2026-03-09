import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, default: 4 },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' }
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);