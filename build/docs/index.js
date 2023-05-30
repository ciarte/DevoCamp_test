"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docs_json_1 = __importDefault(require("./docs.json"));
const paths_json_1 = __importDefault(require("./Company/paths.json"));
const paths_json_2 = __importDefault(require("./Applicant/paths.json"));
const schema_json_1 = __importDefault(require("./Company/schema.json"));
const schema_json_2 = __importDefault(require("./Applicant/schema.json"));
const objConfigSwagger = Object.assign(Object.assign({}, docs_json_1.default), { paths: Object.assign(Object.assign({}, paths_json_1.default), paths_json_2.default), components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: Object.assign(Object.assign({}, schema_json_1.default), schema_json_2.default),
        // "parameters": {}    Create a file for the parameters. "parameters.json"
        // "paths": {}         Create a file for the paths. "paths.json"
        // "responses": {}     Create a file for the responsers. "responses.json"
        // "headers": {}       Create a file for the headers. "headers.json"
    } });
exports.default = objConfigSwagger;
