import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String }],
  stockCount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
