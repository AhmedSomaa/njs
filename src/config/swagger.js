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
      },
      {
        name: 'Book',
        description: 'Everything About Books'
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
      },
      '/books': {
        get: {
          tags: ['Book'],
          summary: 'Returns a list of books',
          consumes: ['application/json'],
          produces: ['application/json'],
          responses: {
            200: {
              description: 'OK'
            },
            404: {
              description: 'Not Found'
            },
            500: {
              description: 'Internal Server Error'
            }
          }
        },
        post: {
          tags: ['Book'],
          summary: 'Add book to database',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'Books object that needs to be added to the database',
              required: true,
              schema: {
                $ref: '#/definitions/Book'
              }
            }
          ],
          responses: {
            200: {
              description: 'OK'
            },
            404: {
              description: 'Not Found'
            },
            500: {
              description: 'Internal Server Error'
            }
          }
        }
      },
      '/books/{isbn}': {
        get: {
          tags: ['Book'],
          summary: 'Find book by ISBN',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'isbn',
              in: 'path',
              description: 'ISBN of the book to return',
              required: true,
              type: 'string',
              format: 'utf8'
            }
          ],
          responses: {
            200: {
              description: 'OK'
            },
            404: {
              description: 'Not Found'
            },
            500: {
              description: 'Internal Server Error'
            }
          }
        },
        put: {
          tags: ['Book'],
          summary: 'Update book by ISBN',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'isbn',
              in: 'path',
              description: 'ISBN of the book to update',
              required: true,
              type: 'string',
              format: 'utf8'
            },
            {
              in: 'body',
              name: 'body',
              description: 'Updated book object',
              required: true,
              schema: {
                $ref: '#/definitions/Book'
              }
            }
          ],
          responses: {
            200: {
              description: 'OK'
            },
            404: {
              description: 'Not Found'
            },
            500: {
              description: 'Internal Server Error'
            }
          }
        },
        delete: {
          tags: ['Book'],
          summary: 'Delete book by ISBN',
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [
            {
              name: 'isbn',
              in: 'path',
              description: 'ISBN of the book to delete',
              required: true,
              type: 'string',
              format: 'utf8'
            }
          ],
          responses: {
            200: {
              description: 'OK'
            },
            404: {
              description: 'Not Found'
            },
            500: {
              description: 'Internal Server Error'
            }
          }
        }
      }
    },
    definitions: {
      Book: {
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          author: {
            type: 'string'
          },
          summary: {
            type: 'string'
          },
          isbn: {
            type: 'string'
          },
          genre: {
            type: 'string'
          },
          uri: {
            type: 'string'
          }
        }
      }
    }
  },
  apis: []
};
