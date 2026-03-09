import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  table: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table' 
  },
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',   // ← یہ لازمی ہے!
    required: false    // اگر walk-in کی اجازت ہے تو false، ورنہ true
  },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'served', 'paid'],
    default: 'pending' 
  }
}, { timestamps: true });

// اگر پہلے سے orders موجود ہیں تو schema change کے بعد migrate کرنا پڑ سکتا ہے
export default mongoose.model('Order', orderSchema);