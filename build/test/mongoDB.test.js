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
//import mongoConnect from "../config/mongoDB";
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
describe("insert", () => {
    let connection;
    let db;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //connection = await mongoConnect();
        connection = yield mongoose_1.default.connect(process.env.DB_URI_LOCAL);
        db = yield connection.db("testing");
    }));
    /*
    afterAll(async () => {
      await connection.close();
    }); */
    /* it("should insert a doc into collection", async () => {
      const users = db.collection("testing");
  
      const mockUser = { _id: "some-user-id", name: "John" };
      await users.insertOne(mockUser);
  
      const insertedUser = await users.findOne({ _id: "some-user-id" });
      expect(insertedUser).toEqual(mockUser);
    }); */
});
