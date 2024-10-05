const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Livros',
    description: 'Uma API simples para gerenciar livros',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);