"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        const uploadsDir = path_1.default.resolve(__dirname, "../../uploads");
        //if the "uploads" folder does not exist, a new one will be created
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir);
        }
        callback(null, path_1.default.resolve(__dirname, "../../uploads"));
    },
    filename: (_req, file, callback) => callback(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname)),
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
