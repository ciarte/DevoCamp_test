import request from 'supertest';
import { mongoConnect } from "../config/mongoDB";
import app  from "../index"
const { faker } = require('@faker-js/faker');
import "dotenv/config";
import mongoose from "mongoose";

describe("Test to save new postulaciones", () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test("Save and safe", async () => {
        const postulaciones = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            porfolio: faker.internet.url(),
            presentationLetter: faker.lorem.sentences(),
            CV: faker.internet.url(),
        }
       
        const response = await request(app).post("/postulaciones").send(postulaciones);
        expect(response.status).toBe(200);
    });

    test("Bad save and safe", async () => {
        const postulaciones = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            porfolio: faker.internet.url(),
            presentationLetter: faker.lorem.sentences(),
        }

        const response = await request(app).post("/postulaciones").send(postulaciones);
        expect(response.status).toBe(500);
    });
})