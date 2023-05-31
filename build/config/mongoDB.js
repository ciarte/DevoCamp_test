"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// export const mongoConnect = async () => {
//   const DB_URI_LOCAL = <string>process.env.DB_URI_LOCAL;
//   try {
//     await mongoose.connect(DB_URI_LOCAL);
//     console.log("DB connected");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB\n", error);
//   }
// };
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const DB_URI_CLOUD = process.env.DB_URI_CLOUD;
    try {
        yield mongoose_1.default.connect(DB_URI_CLOUD);
        console.log("DB connected");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB\n", error);
    }
});
exports.mongoConnect = mongoConnect;
