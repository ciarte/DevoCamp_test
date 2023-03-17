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
const mongoDB_1 = require("../config/mongoDB");
let TestModel = undefined;
let collection = "dbtests";
describe("Prueba de conexión con MongoDB", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongoDB_1.mongoConnect)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    test("Se crea schema y collection para testear", () => __awaiter(void 0, void 0, void 0, function* () {
        let testSchema = yield new mongoose_1.default.Schema({
            first_name: String,
            last_name: String,
        });
        TestModel = mongoose_1.default.model(collection, testSchema);
    }));
    test("Se inserta un usuario de prueba", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = new TestModel({ first_name: "Bernardo", last_name: "Arrechea" });
        yield user.save();
    }));
    test("Se borra el usuario creado", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = TestModel.find({});
        yield user.deleteOne();
    }));
    test("Se borra la colección para la prueba de este test", () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.db.dropCollection(collection);
    }));
});
