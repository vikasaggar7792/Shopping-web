const mongoose = require("mongoose");
const slugify = require("slugify");

// ============================
// REVIEW SCHEMA
// ============================

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


// ============================
// PRODUCT SCHEMA
// ============================

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true
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

    subCategory: {
      type: String
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

    thumbnail: {
      type: String
    },

    variants: [
      {
        color: String,
        size: String,
        stock: Number
      }
    ],

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    reviews: [reviewSchema],

    isFeatured: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    sold: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


// ============================
// 🔥 CREATE SLUG BEFORE SAVE
// ============================

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});


// ============================
// 🔥 VIRTUAL FIELD (Discounted Price)
// ============================

productSchema.virtual("discountedPrice").get(function () {
  if (this.discountPercentage > 0) {
    return (
      this.price - (this.price * this.discountPercentage) / 100
    ).toFixed(2);
  }
  return this.price;
});


// ============================
// 🔥 AUTO CALCULATE RATING
// ============================

productSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const total = this.reviews.reduce((acc, item) => acc + item.rating, 0);
    this.rating = total / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
};


// ============================
// 🔥 TEXT INDEX FOR SEARCH
// ============================

productSchema.index({ name: "text", description: "text", brand: "text" });


module.exports = mongoose.model("Product", productSchema);