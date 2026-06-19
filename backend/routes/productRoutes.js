import express from 'express';
import products from '../data/products.js';
import Product from '../models/Product.js';

const router = express.Router();

// Fetch all products
router.get('/', async (req, res) => {
  try {
    // If we have DB connection and products, fetch from DB
    const dbProducts = await Product.find({});
    if (dbProducts && dbProducts.length > 0) {
      res.json(dbProducts);
    } else {
      // Fallback to local data if DB is empty
      res.json(products);
    }
  } catch (error) {
    // If DB fails, send mock data
    res.json(products);
  }
});

// Fetch single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      // Fallback to local data
      const localProduct = products.find((p) => p._id === req.params.id || p.name === req.params.id);
      if (localProduct) {
         res.json(localProduct);
      } else {
         res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
     const localProduct = products.find((p) => p.name === req.params.id);
     if (localProduct) {
        res.json(localProduct);
     } else {
        res.status(404).json({ message: 'Product not found' });
     }
  }
});

export default router;
