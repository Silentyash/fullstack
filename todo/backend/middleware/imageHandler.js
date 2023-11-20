const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadImage = (req, res) => {
  // Access the uploaded file using req.file
  upload.single("profileImage")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(400).send("Multer Error: " + err.message);
    } else if (err) {
      // An unknown error occurred.
      res.status(500).send("Internal Server Error: " + err.message);
    } else {
      // File uploaded successfully, you can handle further operations here
      res.status(200).send("File uploaded successfully.");
    }
  });
};

module.exports = uploadImage;
