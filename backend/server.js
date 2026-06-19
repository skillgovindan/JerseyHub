import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection (Optional/Graceful degradation)
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log('No MONGO_URI found in .env, skipping DB connection for now.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not exit, allow API to serve mock data
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
