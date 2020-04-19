import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        full_address: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${this.street}, ${this.number}, ${this.city} - ${this.state}, ${this.zip_code}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
