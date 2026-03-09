import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  image: { type: String, default: 'https://picsum.photos/id/1080/300/200' }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);