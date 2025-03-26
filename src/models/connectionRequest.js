const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  toUserId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "accepted", "interested", "rejected"],
      message: `{value} is incorrect type`
    }
  }
}, {
  timestamps : true
}
);

connectionRequestSchema.index({ fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function (next) {
  if(this.fromUserId.equals(this.toUserId)) {
    throw new Error("cannot send connection request to yourself");
  }
  next()
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema );

module.exports = ConnectionRequestModel;