const User = require('../Entities/user');
const userModel = require('../../Infrastructure/Models/userModel');

const create = async (userData) => {
  try {
    const user = new User(userData);
    const createdUser = await userModel.create(user);
    return createdUser.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not create user');
  }
};

module.exports = {
  create,
};
