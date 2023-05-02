const Command = require("../../../Infrastructure/Models/commandModel");

exports.addCommand = async (id, command) => {
  try {
    const newCommand= new Command(command);
    newCommand.buyer=id;
    const savedCommand = await newCommand.save();
    return savedCommand;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getCommandById = async (id) => {
  try{
    const command = await Command.findOne({_id:id});
    return command;
  }
  catch(error){
    throw new Error(error);
  }

}
