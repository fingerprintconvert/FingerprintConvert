const express = require("express");
const {
    downloadMedia
} = require("../controllers/downloaderController");

const router = express.Router();

router.post("/download", downloadMedia);

module.exports = router;