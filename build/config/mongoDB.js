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
const mongoose_1 = __importDefault(require("mongoose"));
const USERNAME = "devocamp";
const PASSWORD = "devocamp";
const dbName = "devocamp";
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}aMh7N9S8Uetm9biy@cluster0.mbqycb3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    try {
        yield mongoose_1.default.connect(DB_URI);
        console.log("DB connected");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB");
        console.error(error);
    }
});
exports.default = mongoConnect;
