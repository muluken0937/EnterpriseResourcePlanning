const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../config/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        let uniqueName = originalName;
        let count = 1;

        while (fs.existsSync(path.join(uploadsDir, uniqueName + ext))) {
            uniqueName = `${originalName}-${count}`;
            count++;
        }

        cb(null, uniqueName + ext);
    }
});

// Filter to allow only images and documents (e.g., PDFs, Word files)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only images and documents are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
