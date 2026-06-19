import * as productRepository from '../repositories/productRepository.js';
import mockProducts from '../data/products.js';

import mongoose from 'mongoose';

export const getAllProducts = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbProducts = await productRepository.findAllProducts();
      if (dbProducts && dbProducts.length > 0) {
        return dbProducts;
      }
    }
    // Fallback to mock data if DB is empty or disconnected
    return mockProducts;
  } catch (error) {
    console.error('Error in getAllProducts service:', error);
    // Fallback to mock data on error (e.g., DB not connected)
    return mockProducts;
  }
};

export const getProductById = async (id) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbProduct = await productRepository.findProductById(id);
      if (dbProduct) {
        return dbProduct;
      }
    }
    
    // Fallback search in mock data
    const mockProduct = mockProducts.find((p) => p._id === id || p.name === id);
    if (mockProduct) return mockProduct;
    
    throw new Error('Product not found');
  } catch (error) {
    // If Mongoose cast error or connection error, fallback to mock data
    const mockProduct = mockProducts.find((p) => p.name === id || p._id === id);
    if (mockProduct) return mockProduct;

    throw new Error('Product not found');
  }
};
