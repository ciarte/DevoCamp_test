import fs from "fs";
import path from "path";

const deleteUploadsContents = () => {
    if (fs.existsSync(path.resolve(__dirname, "../uploads"))) {
        const files = fs.readdirSync(path.resolve(__dirname, "../uploads"));
        for (const file of files) {
            fs.unlinkSync(path.resolve(__dirname, `../uploads/${file}`));
        }
    }
}

export default deleteUploadsContents