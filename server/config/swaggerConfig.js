// swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:5500',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Paths to files containing Swagger annotations
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
