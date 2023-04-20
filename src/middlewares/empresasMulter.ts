import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.resolve(__dirname, "../uploads"));
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

export default upload;