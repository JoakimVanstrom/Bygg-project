const fs = require("fs"); // allows us to read and write files
const path = require("path"); // allows us to get the path to a file

module.exports = {
  getAll: async (req, res) => {
    const images = fs.readdirSync(path.join("upload", "images"));
    res.json({ images });
  },

  upload: (req, res) => {
    console.log(req.files);
    if (!req.files.image.mimetype.startsWith("image/")) {
      console.log("Not an image");
    }

    if (fs.existsSync(path.join("upload", "images", req.files.image.name))) {
      console.log("File already exists");
      req.files.image.name;
    }

    fs.copyFileSync(
      req.files.image.tempFilePath,
      path.join("upload", "images", req.files.image.name)
    );
    res.json({ message: "Image uploaded" });
  },
};
