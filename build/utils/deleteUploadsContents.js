"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteUploadsContents = (filename) => {
    if (filename && fs_1.default.existsSync(path_1.default.resolve(__dirname, "../../uploads", filename))) {
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, "../../uploads", filename));
    }
};
exports.default = deleteUploadsContents;
