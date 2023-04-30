import multer, { Multer } from "multer";
import { Request } from "express";
import path from "path";
import fs from 'fs';

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const uploadsDir = path.resolve(__dirname, "../uploads");

    //if the "uploads" folder does not exist, a new one will be created
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    
    callback(null, path.resolve(__dirname, "../uploads"))
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) =>
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ),
});

const upload: Multer = multer({ storage });
export default upload;
