const commandService = require("../../Application/UseCases/command/commandService");

exports.addCommand = async (req, res) => {
  try {
    const command = await commandService.addCommand(req.user._id, req.body);
    res.status(201).json(command);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCommandById = async (req, res) => {
  try {
    const command = await commandService.getCommandById(req.params.id);
    res.status(200).json(command);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 

