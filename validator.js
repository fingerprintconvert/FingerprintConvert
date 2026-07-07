const path = require("path");

const audioFormats = [
    "mp3","wav","aac","flac","ogg","m4a","wma","opus","aiff"
];

const videoFormats = [
    "mp4","avi","mov","mkv","webm","flv","wmv","mpeg","3gp"
];

const imageFormats = [
    "jpg","jpeg","png","webp","gif","bmp","tiff","avif"
];

exports.isAudioFormat = (format)=>{
    return audioFormats.includes(format.toLowerCase());
};

exports.isVideoFormat = (format)=>{
    return videoFormats.includes(format.toLowerCase());
};

exports.isImageFormat = (format)=>{
    return imageFormats.includes(format.toLowerCase());
};

exports.getExtension = (filename)=>{
    return path.extname(filename).replace(".","").toLowerCase();
};