const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema Biblioteca API",
      version: "1.0.0",
      description: "API do Sistema de Gerenciamento de Biblioteca"
    },

    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);