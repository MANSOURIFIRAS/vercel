const ratingRepository = require('../../../Domain/IRepositories/RatingRepository');
const Rating = require('../../../Infrastructure/Models/ratingModel');
const Compost = require('../../../Infrastructure/Models/compostModel');

const addRating = async (rating) => {
    try {
        console.log("type",typeof(rating));
        return await ratingRepository.create(rating);
    } catch (err) {
        console.error(err);
        throw new Error('Could not create rating');
    }
    }
    const getRatings = async () => {
    try {
        return await ratingRepository.getAll();
    } catch (err) {
        console.error(err);
        throw new Error('Could not get ratings');
    }
    }
    const updateRating = async (rating,ratingId) => {
    try {
        return await ratingRepository.update(rating,ratingId);
    } catch (err) {
        console.error(err);
        throw new Error('Could not update rating');
    }
    }

    const deleteRating = async (ratingId) => {
    try {
        return await ratingRepository.deleteRating(ratingId);
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete rating');
    }
    }
    const getRating = async (product) => {
        try {
            return await ratingRepository.getRating(product);
        } catch (err) {
            console.error(err);
            throw new Error('Could not get rating');
        }
           
    }

    const rateCompost = async (compostId, userId, ratingValue) => {
        let createdRating;
        let updatedCompost;
        
        // check if the user already rated the compost
        const existingRating = await Rating.findOne({ compost: compostId, user: userId });
        
        // if the user already rated the compost, update the existing rating
        if (existingRating) {
          existingRating.ratingValue = ratingValue;
          createdRating = await existingRating.save();
        } else { // otherwise, create a new rating
          createdRating = await Rating.create({ compost: compostId, user: userId, ratingValue });
        }
      
        // calculate the average rating of the compost
        const compostRatings = await Rating.find({ compost: compostId });
        const totalRatings = compostRatings.reduce((sum, rating) => sum + rating.ratingValue, 0);
        const avgRating = totalRatings / compostRatings.length;
      
        // update the compost rating with the new value
        updatedCompost = await Compost.findByIdAndUpdate(compostId, { rating: avgRating }, { new: true });
        
        return { createdRating, updatedCompost };
      };

    module.exports = {
        addRating,getRatings,updateRating,deleteRating,getRating,rateCompost
    };