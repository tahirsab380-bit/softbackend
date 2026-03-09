import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();




const allowedOrigins = [
  "http://localhost:5174",
  "https://azmat-software.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/restaurant1')
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log(err));
import categoryRoutes from './routes/categoryRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customers.js';

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

app.get('/',(req,res)=>{
     res.send("Srver runing")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));