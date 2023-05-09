import fs from "fs";
import path from "path";

const deleteUploadsContents = (filename?: string): void => {
    if (filename && fs.existsSync(path.resolve(__dirname, "../../uploads", filename))) {
        fs.unlinkSync(path.resolve(__dirname, "../../uploads", filename));
    }
};

export default deleteUploadsContents