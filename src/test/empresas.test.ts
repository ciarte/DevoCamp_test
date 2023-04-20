import request from "supertest";
import app from "../index";
import { mongoConnect } from "../config/mongoDB";
import mongoose from "mongoose";

const dummyData = {
    interes: "test",
    nombre: "test",
    correo: "test@gmail.com",
    tel: "test",
    presentacion: "test",
    archivoAdjunto: "test"
};
const caseScenarios = [
    {},
    { nombre: "testName", },
    { interes: "testContent" }
];

describe("POST /empresas", () => {

    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should return a 201 Created response with a saved empresa object, message and a content-type of application/json when the request body is valid', async () => {
        const response = await request(app)
            .post("/empresas")
            .field("interes", dummyData.interes)
            .field("nombre", dummyData.nombre)
            .field("correo", dummyData.correo)
            .field("tel", dummyData.tel)
            .field("presentacion", dummyData.presentacion)
            .attach("archivoAdjunto", Buffer.from(dummyData.archivoAdjunto), "test.txt");

        expect(response.status).toBe(201);
        expect(response.body.savedEmpresa).toBeDefined();
        expect(response.body.message).toBe('Hemos recibido su solicitud');
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
    });

    test('should returns a 400 Bad Request response with an errors array if no interes or nombre or neither are sent"', async () => {
        for (const scenario of caseScenarios) {
            const response = await request(app)
                .post("/empresas").send(scenario)
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors.length).toBeGreaterThan(0);
        };
    });
});