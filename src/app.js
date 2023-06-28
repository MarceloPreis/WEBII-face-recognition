const express = require('express');
const router = require('./router');
const multer = require('multer');
const app = express();
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000000, files: 5 },
});


app.use(upload.array('file'));
app.use(express.static('public'));
app.use(router);

module.exports = app;