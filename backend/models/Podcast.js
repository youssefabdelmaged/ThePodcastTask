const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    host: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "general",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
    episodeCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
podcastSchema.index({ title: "text", description: "text" });
podcastSchema.index({ category: 1 });
podcastSchema.index({ rating: -1 });
podcastSchema.index({ publishedAt: -1 });

module.exports = mongoose.model("Podcast", podcastSchema);
