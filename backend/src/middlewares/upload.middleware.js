const path = require('path');
const multer = require('multer');

const maxSize = 1 * 5000 * 5000;

const fileMatch = [
    "image/png", 
    "image/jpg", 
    "image/jpeg"
];

var storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        let uploadPath = './uploads/firm/';
        if(file.fieldname === 'logo') 
            uploadPath = './uploads/firm/';

        if (fileMatch.indexOf(file.mimetype) >= 0)
            callback(null, path.join(uploadPath));
    },

    filename: (req, file, callback) => {
        if (fileMatch.indexOf(file.mimetype) === -1) {
            return callback("Invalid file format", null);
        }
        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

let uploadFiles = multer({
    storage: storage,
    limits: { fileSize: maxSize}
});
module.exports = uploadFiles;