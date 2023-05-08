import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
      openapi: "3.0.0",
info:{     
    title:"STAFF-BACKEND",
    version:"1.0.0",
},
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      postulaciones: {
        type: "object",
        required: ["name", "email", "linkedin", "porfolio", "presentationLetter", "cv_file"],
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          linkedin: {
            type: "string",
          },
          porfolio: {
            type: "string",
          },
          presentationLetter: {
            type: "string",
          },
          cv_file: {
            type: "string",
          },
        },
      },
      
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);