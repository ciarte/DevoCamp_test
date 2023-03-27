import request from 'supertest';
import mongoose from "mongoose";
import { mongoConnect } from "../config/mongoDB";
import app  from "../index"
const { faker } = require('@faker-js/faker');
import "dotenv/config";


describe("Test to save new postulaciones", () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await app.listen(process.env.PORT).close();
    });

    test("Save new wrong postulaciones", async () => {
        const postulaciones = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            porfolio: faker.internet.url(),
            presentationLetter: faker.lorem.paragraph(),
            cv: faker.lorem.paragraph(),
        }

        const response = await request(app).post("/postulaciones").send(postulaciones);
        expect(response.status).toBe(500);
    });
})