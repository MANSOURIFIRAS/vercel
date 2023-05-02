const Rating = require('../Entities/rating');
const ratingModel = require('../../Infrastructure/Models/ratingModel');
const productModel = require('../../Infrastructure/Models/productModel');
const userModel = require('../../Infrastructure/Models/userModel');
const create = async (ratingData) => {
    try {
      const rating = new Rating(ratingData);
      console.log("ratingData",ratingData)
      const user = await ratingModel.findOne({user:ratingData.user,product:ratingData.product});
      var createdRating ="";
      if(user){
         createdRating = await ratingModel.findOneAndReplace({user:ratingData.user,product:ratingData.product},rating);
      }
        else{
         createdRating = await ratingModel.create(rating);
        }
        return createdRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not create rating');
    }
}
const getAll = async () => {
    try {
        const ratings = await ratingModel.find();
        return ratings.map((rating) => rating.toObject());
    } catch (err) {
        console.error(err);
        throw new Error('Could not get ratings');
    }
}
const getRating = async (product) => {
    var total = 0;
    var average = 0;
    try {
        const ratrins = await ratingModel.find({product:product});
         ratrins.map(
            (rating) => {
                total+=rating.ratingValue;
                average = total/ratrins.length;
             //   console.log("total",total)
             //   console.log("average",average)
             //   return rating.toObject()
            }
            );
            const productupdated = await productModel.findByIdAndUpdate(product,{rating:average});

            return productupdated.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not get rating');
    }

}
const update = async (ratingData,ratingId) => {
    try {
        const rating = new Rating(ratingData);
        const updatedRating = await ratingModel.findByIdAndUpdate(ratingId,rating);
        return updatedRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not update rating');
    }
}
const deleteRating = async (ratingId) => {
    try {
        const deletedRating = await ratingModel.findByIdAndDelete(ratingId);
        return deletedRating.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete rating');
    }
}

module.exports = {
 create,getAll,update,deleteRating,getRating
};
