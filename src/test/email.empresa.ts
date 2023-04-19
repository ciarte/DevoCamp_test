import request from 'supertest';
import { mongoConnect } from "../config/mongoDB";
import app  from "../index"
const { faker } = require('@faker-js/faker');
import "dotenv/config";
import mongoose from "mongoose";
import { Empresas } from '../models/Empresas';

describe("Test to save new postulaciones", () => {
    beforeAll(async () => {
        await mongoConnect();
    });
  
    afterAll(async () => {
        await mongoose.disconnect();
    });
  
  
    
  describe(" Test  empresas", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/empresas").send();
      expect(response.statusCode).toBe(200);
    
      
    });
  
   });
  
  
  describe("Test to save new empresas", () => {
    const empresas = {
      name: 'string',
      email: 'string',
      direccion:'string',
      
  
    };
    
    describe('the empresas', () => {
      test('has email', () => {
        expect(empresas.email).toBe('string');
      });
    
      test('has a  name', () => {
        expect(empresas.name).toBe('string');
      });
      test('has linkedin', () => {
        expect(empresas.direccion).toBe('string');
      });
    
      
    }); 
    
  
  });
})  
