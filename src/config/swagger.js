export default {
  definition: {
    swagger: '2.0.0',
    info: {
      title: 'Express API',
      description: 'This is a sample node API useing Express Framework.',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/api',
    schemes: ['http'],
    tags: [
      {
        name: 'Status',
        description: 'Server Health Checkpoint'
      }
    ],
    paths: {
      '/status': {
        get: {
          tags: ['Status'],
          summary: 'Server Health Checkpoint',
          consumes: ['application/json'],
          produces: ['application/json'],
          responses: {
            200: {
              response: 'OK'
            },
            404: {
              response: 'Not Found'
            }
          }
        }
      }
    }
  },
  apis: []
};
