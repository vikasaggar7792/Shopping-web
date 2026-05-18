const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Fashion", "Shoes", "Accessories"]
  },

  price: {
    type: Number,
    required: true
  },

  discountPercentage: {
    type: Number,
    default: 0
  },

  countInStock: {
    type: Number,
    required: true,
    default: 0
  },

  sku: {
    type: String,
    unique: true
  },

  images: [
    {
      type: String
    }
  ],

  isFeatured: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  rating: {
    type: Number,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  },

  reviews: [reviewSchema]
},
{ timestamps: true }
);

// 🔥 Virtual field for discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (this.discountPercentage > 0) {
    return (
      this.price - (this.price * this.discountPercentage) / 100
    ).toFixed(2);
  }
  return this.price;
});

// 🔥 Index for faster search
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);