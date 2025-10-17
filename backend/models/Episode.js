const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    hosts: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    audioUrl: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    transcriptUrl: {
      type: String,
      trim: true,
    },
    showNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    chapterMarks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        startTime: {
          type: Number,
          required: true,
          min: 0,
        },
        endTime: {
          type: Number,
          min: 0,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      trim: true,
      default: "general",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    playCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
episodeSchema.index({ title: "text", description: "text", hosts: "text" });
episodeSchema.index({ isFeatured: 1, publishedAt: -1 });
episodeSchema.index({ category: 1 });
episodeSchema.index({ publishedAt: -1 });

module.exports = mongoose.model("Episode", episodeSchema);
