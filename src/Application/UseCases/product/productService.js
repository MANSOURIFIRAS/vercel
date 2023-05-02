const productRepository = require('../../../Domain/IRepositories/ProductRepository');

const addProduct = async (product) => {
  try {
    return await productRepository.create(product);
  } catch (err) {
    console.error(err);
    throw new Error('Could not create product');
  }
};
const getProducts = async () => {
  try {
    return await productRepository.getAll();
  } catch (err) {
    console.error(err);
    throw new Error('Could not get products');
  }
};
const getProductUser = async (userId) => {
  try {
    return await productRepository.getProductUser(userId);
  } catch (err) {
    console.error(err);
    throw new Error('Could not get products');
  }
};

const updateProduct = async (product,productId) => {
  try {
    return await productRepository.update(product,productId);
  } catch (err) {
    console.error(err);
    throw new Error('Could not update product');
  }
};

const deleteProduct = async (productId) => {
  try {
    return await productRepository.deleteProduct(productId);
  } catch (err) {
    console.error(err);
    throw new Error('Could not delete product');
  }
};
const getProduct = async (productId) => {
  try {
    return await productRepository.getProduct(productId);
  } catch (err) {
    console.error(err);
    throw new Error('Could not get product');
  }
};



module.exports = {
    addProduct,getProducts,updateProduct,deleteProduct,getProduct,getProductUser
};
