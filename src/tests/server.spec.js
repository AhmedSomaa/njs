import Server from '../models/classes/server';
jest.mock('../models/classes/server');

describe('Server Class', () => {
  beforeEach(() => {
    Server.mockClear();
  });

  it('Server Class Construcort Could be Called', () => {
    const server = new Server();
    expect(Server).toHaveBeenCalledTimes(1);
  });

  it('Server Constructor returns an Object', () => {
    const server = new Server();
    expect(server).toBeInstanceOf(Object);
  });
});
