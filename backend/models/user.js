const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  houseNo: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  phone: {
    type: String
  },

  avatar: {
    type: String, // Cloudinary image URL
    default: ""
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  addresses: [addressSchema],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  emailVerificationToken: String,

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  isBlocked: {
    type: Boolean,
    default: false
  },

  lastLogin: Date
},
{ timestamps: true }
);



// 🔐 Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



// 🔐 Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// 🔐 Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};



module.exports = mongoose.model("User", userSchema);