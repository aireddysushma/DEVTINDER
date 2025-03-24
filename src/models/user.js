const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email address" + value)
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password")
      }
    }
  },
  age: {
    type: Number,
    min : 18
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoURL: {
    type: String,
    default: "https://cdn.vectorstock.com/i/2000v/76/27/default-profile-picture-avatar-photo-placeholder-vector-30247627.avif",
    validate(value) {
      if(!validator.isURL(value)) {
        throw new Error("Invalid photo url")
      }
    }
  },
  about: {
    type: String,
    default: "This is the default about"
  },
  skills: {
    type: [String],
  }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "sushma@123", { expiresIn: "1d" })
  return token;
}

userSchema.methods.validatePassword = async function (password) {
  const passwordhash = await bcrypt.compare(password, this.password);
  return passwordhash;
}

const User = mongoose.model("User", userSchema)

module.exports = User;
