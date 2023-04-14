import multer, { Multer } from "multer";
import path from "path";
import { Request } from "express";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => callback(null, path.resolve(__dirname, "../../uploads")),
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
