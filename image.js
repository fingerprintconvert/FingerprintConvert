const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const {
    convertImage
} = require("../controllers/imageController");

const router = express.Router();

const storage = multer.diskStorage({

    destination(req, file, cb){

        cb(null, "uploads");

    },

    filename(req, file, cb){

        cb(
            null,
            uuidv4() +
            path.extname(file.originalname)
        );

    }

});

const upload = multer({

    storage,

    limits:{
        fileSize:100 * 1024 * 1024
    }

});

router.post(

    "/convert",

    upload.single("file"),

    convertImage

);

module.exports = router;