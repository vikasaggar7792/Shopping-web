const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Mongoose strict mode
    mongoose.set("strictQuery", true);

    // Debug mode (optional)
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,        // Auto create indexes
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    console.log(`\x1b[32m✔ MongoDB Connected Successfully\x1b[0m`);
    console.log(`\x1b[36mDatabase Host: ${conn.connection.host}\x1b[0m`);

  } catch (error) {
    console.error("\x1b[31m✖ MongoDB Connection Failed\x1b[0m");
    console.error(error.message);
    process.exit(1);
  }
};

/* Connection Events */

mongoose.connection.on("connected", () => {
  console.log("\x1b[32mMongoDB connection established\x1b[0m");
});

mongoose.connection.on("error", (err) => {
  console.error("\x1b[31mMongoDB error:\x1b[0m", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("\x1b[33mMongoDB disconnected\x1b[0m");
});

/* Graceful Shutdown */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("\x1b[31mMongoDB connection closed due to app termination\x1b[0m");
  process.exit(0);
});

module.exports = connectDB;