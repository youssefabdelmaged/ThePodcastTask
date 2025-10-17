const express = require("express");
const router = express.Router();
const Episode = require("../models/Episode");

// GET /api/episodes - Get all episodes with pagination and filtering
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      query,
      category,
      sortBy = "publishedAt",
      sortOrder = "desc",
      featured,
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query object
    let queryObj = {};

    if (query) {
      queryObj.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { hosts: { $regex: query, $options: "i" } },
      ];
    }

    if (category) {
      queryObj.category = category;
    }

    if (featured === "true") {
      queryObj.isFeatured = true;
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;

    const episodes = await Episode.find(queryObj)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Episode.countDocuments(queryObj);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        items: episodes,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching episodes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET /api/episodes/featured - Get featured episodes
router.get("/featured", async (req, res) => {
  try {
    const episodes = await Episode.find({ isFeatured: true })
      .sort({ publishedAt: -1 })
      .limit(6)
      .lean();

    res.json({
      success: true,
      data: episodes,
    });
  } catch (error) {
    console.error("Error fetching featured episodes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET /api/episodes/:id - Get single episode
router.get("/:id", async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).lean();

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    // Increment play count
    await Episode.findByIdAndUpdate(req.params.id, { $inc: { playCount: 1 } });

    res.json({
      success: true,
      data: episode,
    });
  } catch (error) {
    console.error("Error fetching episode:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// POST /api/episodes - Create new episode
router.post("/", async (req, res) => {
  try {
    const episode = new Episode(req.body);
    const savedEpisode = await episode.save();

    res.status(201).json({
      success: true,
      data: savedEpisode,
      message: "Episode created successfully",
    });
  } catch (error) {
    console.error("Error creating episode:", error);
    res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.message,
    });
  }
});

// PUT /api/episodes/:id - Update episode
router.put("/:id", async (req, res) => {
  try {
    const episode = await Episode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    res.json({
      success: true,
      data: episode,
      message: "Episode updated successfully",
    });
  } catch (error) {
    console.error("Error updating episode:", error);
    res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.message,
    });
  }
});

// DELETE /api/episodes/:id - Delete episode
router.delete("/:id", async (req, res) => {
  try {
    const episode = await Episode.findByIdAndDelete(req.params.id);

    if (!episode) {
      return res.status(404).json({
        success: false,
        message: "Episode not found",
      });
    }

    res.json({
      success: true,
      message: "Episode deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting episode:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
