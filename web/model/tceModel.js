const mongoose = require("mongoose");

const tceSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "TCE Cultural Hub"
  },
  college: {
    type: String,
    default: "Thiagarajar College of Engineering"
  }
});

module.exports = mongoose.model("TCE", tceSchema);