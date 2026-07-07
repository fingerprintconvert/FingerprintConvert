const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);

exports.convertAudio = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No audio file uploaded."
        });
    }

    const format = req.body.format;

    if (!format) {
        return res.status(400).json({
            success: false,
            message: "Please select an output format."
        });
    }

    const inputFile = req.file.path;

    const outputFile = path.join(
        "output",
        uuidv4() + "." + format
    );

    ffmpeg(inputFile)

        .toFormat(format)

        .on("end", () => {

            res.download(outputFile, () => {

                fs.remove(inputFile);
                fs.remove(outputFile);

            });

        })

        .on("error", (err) => {

            console.log(err);

            fs.remove(inputFile);

            res.status(500).json({

                success: false,

                message: "Audio conversion failed."

            });

        })

        .save(outputFile);

};