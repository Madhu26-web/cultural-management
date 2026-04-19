const Registration = require("../model/registrationModel");

exports.registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  const reg = await Registration.create({ userId, eventId });

  res.json({
    message: "Registered Successfully",
    reg
  });
};