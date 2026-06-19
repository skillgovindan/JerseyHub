import Product from '../models/Product.js';

export const findAllProducts = async () => {
  return await Product.find({});
};

export const findProductById = async (id) => {
  return await Product.findById(id);
};
