import multer from "multer";
import path from "path";
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      const uploadsDir = path.resolve(__dirname, "../uploads");
      
      //if the "uploads" folder does not exist, a new one will be created
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      cb(null, uploadsDir);
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export default upload;