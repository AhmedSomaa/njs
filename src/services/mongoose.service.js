import events from 'events';
import mongoose from 'mongoose';

const eventEmitter = new events.EventEmitter();

export default class MongooseService {
  constructor(dbUrl, options) {
    this.dbUrl = dbUrl;
    this.options = options;
  }

  async connect() {
    return eventEmitter.emit('connect', { dbUrl: this.dbUrl, options: this.options });
  }
}

eventEmitter.on('connect', async ({ dbUrl, options }) => {
  await mongoose.connect(dbUrl, options);
  const db = await mongoose.connection;
  return db;
});
