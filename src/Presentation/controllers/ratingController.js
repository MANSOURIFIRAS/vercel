const ratingService = require('../../Application/UseCases/rating/ratingService');
const rating = require('../../Domain/Entities/rating')
const Compost = require('../../Infrastructure/Models/compostModel');

const addRating = async (req, res) => {
    try{
        const rating = req.body; // assuming user details are passed in the request body
        console.log("1",req.body);
        console.log("2",rating);
        const createdRating = await ratingService.addRating(rating);
        res.status(201).json(createdRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
};
const getRatings = async (req, res) => {
    try{
        const ratings = await ratingService.getRatings();
        res.status(200).json(ratings);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error ratings'});
    }
}
const updateRating = async (req, res) => {
    try{
        const rating = req.body; // assuming user details are passed in the request body
        const ratingId = req.params.id;
        console.log(rating);
        const updatedRating = await ratingService.updateRating(rating,ratingId);
        res.status(200).json(updatedRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
}
const deleteRating = async (req, res) => {
    try{
        const ratingId = req.params.id;
        const deletedRating = await ratingService.deleteRating(ratingId);
        res.status(200).json(deletedRating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
}
const getRating = async (req, res) => {
    try{
        const product = req.params.product;
        const rating = await ratingService.getRating(product);
        res.status(200).json(rating);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
        
}


//compost Rating
const rateCompost = async (req, res) => {
    try{
        const compostId = req.params.idCompost;
        const userId = req.user._id;
        const ratingValue = parseInt(req.params.ratingValue);
        
        const compost = await Compost.findById(compostId);
    
        if (!compost) {
        return res.status(404).json({ message: 'Compost not found' });
        }

        // check if the user is the seller of the compost
        if (compost._idSeller.equals(userId)) {
        return res.status(403).json({ message: 'You cannot rate your own compost' });
        }

        const { createdRating, updatedCompost } = await ratingService.rateCompost(compostId, userId, ratingValue);
    
        res.status(201).json({ createdRating, updatedCompost });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error rating'});
    }
};


module.exports = {
    addRating,getRatings,updateRating,deleteRating,getRating, rateCompost
};

