const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://youssefabdelmaged50_db_user:6Lg0WCko3e1G7NST@cluster0.vbgcvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
