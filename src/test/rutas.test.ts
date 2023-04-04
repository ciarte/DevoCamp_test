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


  
describe("GET /postulaciones", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/postulaciones").send();
    expect(response.statusCode).toBe(200);
  });

 });


describe("POST /postulaciones", () => {
  describe("should respond a json as a content type", () => {
    
    // should respond with a 200 code
    test("should respond with a 200 status code", async () => {
      const newPostulaciones=[{
        name: 'string',
            email: 'string',
            linkedin:'string',
            porfolio: 'string',
            presentationLetter: 'string',
            CV: 'string',
      }
    ]
      

      const response = await request(app).post("/postulaciones").send(newPostulaciones);
      expect(response.status).toBe(200);
      
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      
    });

    
      
      
   
  });

  describe("when the name ", () => {
    // should respond with a 500 code
    test("shoud respond with a 500 status code", async () => {
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
