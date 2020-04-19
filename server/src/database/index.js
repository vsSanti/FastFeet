import Sequelize from 'sequelize';

import Order from '../app/models/Order';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Problem from '../app/models/Problem';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliveryman, Order, Problem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
