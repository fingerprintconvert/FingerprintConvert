// ==========================================
// FingerprintConvert
// Main Server
// ==========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs-extra");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Create folders
fs.ensureDirSync("./uploads");
fs.ensureDirSync("./output");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static Files
app.use(express.static(path.join(__dirname)));

// Routes
app.use("/audio", require("./routes/audio"));
app.use("/video", require("./routes/video"));
app.use("/image", require("./routes/image"));
app.use("/pdf", require("./routes/pdf"));
app.use("/downloader", require("./routes/downloader"));

// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Status
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        app: "FingerprintConvert",
        version: "1.0.0",
        status: "Running"
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log("================================");
    console.log("FingerprintConvert");
    console.log("Server Running");
    console.log("Port:", PORT);
    console.log("================================");
});