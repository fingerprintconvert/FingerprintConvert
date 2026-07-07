const sharp = require("sharp");
const path = require("path");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

exports.convertImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded."
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

        await sharp(inputFile)

            .toFormat(format)

            .toFile(outputFile);

        res.download(outputFile, () => {

            fs.remove(inputFile);

            fs.remove(outputFile);

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Image conversion failed."

        });

    }

};