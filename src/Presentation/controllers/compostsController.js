const compostService = require("../../Application/UseCases/compost/compostService");
const Compost = require("../../Infrastructure/Models/compostModel");
const omit = require("../../Presentation/utils/omit");
const uploadImage = require("../../Presentation/utils/cloudinary/uploadImage");
const fs = require("fs");
const path = require("path");

exports.getAllComposts = async (req, res) => {
  try {
    const composts = await compostService.getAllComposts();
    res.status(200).json(composts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompostById = async (req, res) => {
  try {
    const compost = await compostService.getCompostById(req.params.id);
    res.status(200).json(compost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCompost = async (req, res) => {
  try {
    const compostData = omit(req.body, ["file"]);
    compostData._idSeller = req.user._id;

    const compost = new Compost(compostData);
    if (Object.keys(req.files || {}).length > 0) {
      const image = req.files.file[0] || req.body.file || { path: "" };
      const uploadedImage = await uploadImage(image.path);
      compost.image = uploadedImage ? uploadedImage.url : "";
      if (uploadedImage) {
        let filePath = path.join(`${__dirname}/../../`, image.path);
        if (filePath.includes("uploads")) {
          fs.unlink(filePath, () => {});
        }
      }
    }
    const composte = await compost.save();
    res.status(201).json(composte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompost = async (req, res) => {
  try {
    const compostData = omit(req.body, ["file"]);

    if (Object.keys(req.files || {}).length > 0) {
      const image = req.files.file[0] || req.body.file || { path: "" };
      const uploadedImage = await uploadImage(image.path);
      compostData.image = uploadedImage ? uploadedImage.url : "";
      // if (compostData.image.startsWith("blob:")){
      //   compostData.image.substring(5)
      // }
      if (uploadedImage) {
        let filePath = path.join(`${__dirname}/../../`, image.path);
        if (filePath.includes("uploads")) {
          fs.unlink(filePath, () => {});
        }
      }
    }

    const updatedCompost = await Compost.findByIdAndUpdate(
      req.params.id,
      compostData,
      { new: true }
    );
    res.status(200).json(updatedCompost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCompost = async (req, res) => {
  try {
    const compost = await compostService.deleteCompost(req.params.id);
    res.status(200).json(compost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSellerComposts = async (req, res) => {
  try {
    const idSeller = req.user._id;
    const composts = await compostService.getSellerComposts(idSeller);
    res.status(200).json(composts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopRatedComposts = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const topComposts = await compostService.getTopRatedComposts(limit);
    res.status(200).json(topComposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentlyAddedComposts = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const composts = await compostService.getRecentlyAddedComposts(limit);
    res.status(200).json(composts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopSelledComposts = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const composts = await compostService.getTopSelledComposts(limit);
    res.status(200).json(composts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
