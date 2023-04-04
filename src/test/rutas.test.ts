import mongoose from "mongoose";
import { mongoConnect } from "../config/mongoDB";
import request from "supertest";
import app  from "../index";
import "dotenv/config";


describe("Test to save new postulaciones", () => {
  beforeAll(async () => {
      await mongoConnect();
  });

  afterAll(async () => {
      await mongoose.disconnect();
  });


  
describe(" Test  postulaciones", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/postulaciones").send();
    expect(response.statusCode).toBe(200);
  
    
  });

 });


describe("Test to save new postulaciones", () => {
  const postulaciones = {
    name: 'string',
    email: 'string',
    linkedin:'string',
    porfolio: 'string',
    presentationLetter: 'string',
    CV: 'string',

  };
  
  describe('the postulaciones', () => {
    test('has email', () => {
      expect(postulaciones.email).toBe('string');
    });
  
    test('has a  name', () => {
      expect(postulaciones.name).toBe('string');
    });
    test('has linkedin', () => {
      expect(postulaciones.linkedin).toBe('string');
    });
  
    test('has a  porfolio', () => {
      expect(postulaciones.porfolio).toBe('string');
    });
    test('has a  cv', () => {
      expect(postulaciones.CV).toBe('string');
    });

  }); 
  




  describe("when the name ", () => {
    // should respond with a 400 code
    test("shoud respond with a 400 status code", async () => {
      const postulaciones = [
        {name: 'string',
        email: 'string',
          },
        
      ];

      for (const body of postulaciones) {
        const response = await request(app).post("/postulaciones").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
})
