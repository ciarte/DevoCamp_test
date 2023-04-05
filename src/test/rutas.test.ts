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
describe("POST /postulaciones", () => {
  describe("given postulaciones", () => {
    const newPostulaciones={
      name: 'string',
          email: 'string',
          linkedin:'string',
          porfolio: 'string',
          presentationLetter: 'string',
          CV: 'string',
    }
   
   
    // should respond a json as a content type
    test("should have a Content-Type: application/json header", async () => {
      const response = await request(app).post("/postulaciones").send(newPostulaciones);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("should respond with an postulaciones name", async () => {
      const response = await request(app).post("/postulaciones").send(newPostulaciones);
      expect(response.body.name).toBeDefined();
    });
  })
})