import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain text for simplicity (production میں hash کرو)
  role: { type: String, default: 'admin' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);