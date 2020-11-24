import compression from 'compression';
import Server from '../classes/server';
import statusRouter from '../routes/status';

jest.mock('../classes/server');

describe('Server', () => {
  let server;
  const routes = [
    {
      name: 'status',
      router(debug) {
        return statusRouter(debug);
      }
    }
  ];
  const middlewares = [compression()];

  beforeEach(() => {
    Server.mockClear();
    server = new Server(3000, 'localhost');
    server.setMiddlewares(middlewares);
    server.setApiRoutes(routes);
    server.setSwagger();
    server.start();
  });

  it('should call constructor method', () => {
    expect(Server).toHaveBeenCalledTimes(1);
  });

  it('should return a server object', () => {
    expect(server).toBeInstanceOf(Object);
  });

  it('should call constructor method with port and host', () => {
    expect(Server).toBeCalledWith(3000, 'localhost');
  });

  it('should call setMiddlewares', () => {
    expect(server.setMiddlewares).toBeCalledTimes(1);
  });

  it('should call setMiddlewares with non empty middlewares array ', () => {
    expect(middlewares.length).not.toBe(0);
  });

  it('should call setMiddlewares with array of functions', () => {
    middlewares.forEach((middleware) => {
      expect(typeof middleware).toBe('function');
    });
  });

  it('should call setApiRoutes', () => {
    expect(server.setApiRoutes).toBeCalledTimes(1);
  });

  it('should call setApiRoutes with non empty routes array ', () => {
    expect(routes.length).not.toBe(0);
  });

  it('should call setApiRoutes with an array of objects ', () => {
    routes.forEach((route) => {
      expect(route).toBeInstanceOf(Object);
      expect(typeof route.name).toBe('string');
      expect(typeof route.router).toBe('function');
    });
  });

  it('should call setSwagger', () => {
    expect(server.setSwagger).toBeCalledTimes(1);
  });

  it('should call start', () => {
    expect(server.start).toBeCalledTimes(1);
  });
});
