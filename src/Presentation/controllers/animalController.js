const Animal = require("../../Infrastructure/Models/animalModel");
const vision = require('@google-cloud/vision');
const uploadImage = require('../utils/cloudinary/uploadImage');
const fs = require('fs');
const path = require('path');



const client = new vision.ImageAnnotatorClient({
    keyFilename: './GoogleCloudVisionApiKey.json'
});
const getIAObjects = async (req, res) => {
  try {
    if (Object.keys(req.files || {}).length > 0) {
      const image = req.files.file[0] || req.body.file || { path: "" };
      const uploadedImage = await uploadImage(image.path);
      pic = uploadedImage ? uploadedImage.url : "";
      if (uploadedImage) {
        let filePath = path.join(`${__dirname}/../../`, image.path);
        if (filePath.includes("uploads")) {
          fs.unlink(filePath, () => {});
        }
      }
    }

    const [result] = await client.objectLocalization(pic);
    const objects = result.localizedObjectAnnotations.map((object) => ({
      name: object.name,
      score: object.score,
      boundingPoly: object.boundingPoly,
    }));
    return res.json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error detecting objects");
  }
};

const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAnimal = async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    image: req.body.image,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    age: req.body.age,
    healthStatus: req.body.healthStatus,
    vaccinations: req.body.vaccinations,
    feedingSchedule: req.body.feedingSchedule,
    price: req.body.price,
    quantity: req.body.quantity,
    user: req.body.user,
    Farm: req.body.Farm,
  });
  try {
    const newAnimal = await animal.save();
    return res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAnimal = async (req, res) => {
  if (req.body.name != null) {
    res.animal.name = req.body.name;
  }
  if (req.body.image != null) {
    res.animal.image = req.body.image;
  }
  if (req.body.sex != null) {
    res.animal.sex = req.body.sex;
  }
  if (req.body.birthdate != null) {
    res.animal.birthdate = req.body.birthdate;
  }
  if (req.body.age != null) {
    res.animal.age = req.body.age;
  }
  if (req.body.healthStatus != null) {
    res.animal.healthStatus = req.body.healthStatus;
  }
  if (req.body.vaccinations != null) {
    res.animal.vaccinations = req.body.vaccinations;
  }
  if (req.body.feedingSchedule != null) {
    res.animal.feedingSchedule = req.body.feedingSchedule;
  }
  if (req.body.price != null) {
    res.animal.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.animal.quantity = req.body.quantity;
  }

  if (req.body.Farm != null) {
    res.animal.Farm = req.body.Farm;
  }

  try {
    const updatedAnimal = await res.animal.save();
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    await res.animal.remove();
    res.json({ message: "Deleted Animal" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOneAnimal = (req, res) => {
  res.json(res.animal);
};

module.exports = {
  getAllAnimals,
  addAnimal,
  updateAnimal,
  deleteAnimal,
  getOneAnimal,
  getIAObjects,
};
