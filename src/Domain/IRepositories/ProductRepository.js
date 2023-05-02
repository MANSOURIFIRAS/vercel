const Product = require('../Entities/product');
const productModel = require('../../Infrastructure/Models/productModel');
const ratingModel = require('../../Infrastructure/Models/ratingModel');

const create = async (productData) => {
  try {
    const product = new Product(productData);
    console.log(product);
    const createdProduct = await productModel.create(product);
    return createdProduct.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not create product');
  }
};
const getAll = async () => {
  try {
    const products = await productModel.find();
    return products.map((product) => product.toObject());
  } catch (err) {
    console.error(err);
    throw new Error('Could not get products');
  }
};
const getProductUser = async (userId) => {
  try {
    const products = await productModel.find({user:userId});
    console.log("userId",userId);
    console.log(products);
    return products.map((product) => product.toObject());
  } catch (err) {
    console.error(err);
    throw new Error('Could not get products');
  }
};
const getProduct = async (productId) => {
  var total = 0;
  var average = 0;
  try {
    const ratrins = await ratingModel.find({product:productId});
    ratrins.map(
       (rating) => {
           total+=rating.ratingValue;
           average = total/ratrins.length;
        //   console.log("total",total)
        //   console.log("average",average)
        //   return rating.toObject()
       }
       );
       const productupdated = await productModel.findByIdAndUpdate(productId,{rating:average});

    return productupdated.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not get product');
  }
};

const update = async (productData,productId) => {
  try {
    const product = new Product(productData);
    const updateProduct = await productModel.findByIdAndUpdate(productId,product);
    return updateProduct.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not update product');
  }
};

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct.toObject();
  } catch (err) {
    console.error(err); 
    throw new Error('Could not delete product');
  }
};



module.exports = {
  create,getAll,update,deleteProduct,getProduct,getProductUser
};
