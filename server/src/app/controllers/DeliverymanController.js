import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymenController {
  async index(req, res) {
    const { page = 1, limit = 5, name } = req.query;

    let whereStatement = {};
    if (name) {
      whereStatement = {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      };
    }

    const { count, rows } = await Deliveryman.findAndCountAll({
      where: whereStatement,
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email'],
    });

    return res.json({ count, deliverymen: rows });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email', 'createdAt'],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    return res.json({ user: deliveryman });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number()
        .integer()
        .positive()
        .nullable(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { avatar_id, email } = req.body;

    /**
     * Check if email is already registered
     */
    const deliverymanExits = await Deliveryman.findOne({
      where: {
        email,
      },
    });
    if (deliverymanExits) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    /**
     * Check if avatar exists
     */
    if (avatar_id && !(await File.findByPk(avatar_id))) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number()
        .integer()
        .positive()
        .nullable(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if deliveryman exists
     */
    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const { email, avatar_id } = req.body;

    /**
     * Check if email is already registered
     */
    if (email && email !== deliveryman.email) {
      const deliverymanExits = await Deliveryman.findOne({
        where: {
          email,
        },
      });
      if (deliverymanExits) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    /**
     * Check if avatar exists
     */
    if (avatar_id && !(await File.findByPk(avatar_id))) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const { id, name, email: updatedEmail } = await deliveryman.update({
      ...req.body,
    });

    return res.json({
      id,
      name,
      email: email || updatedEmail,
      avatar_id,
    });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id } = req.params;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    await deliveryman.destroy();
    return res.json({ ok: true });
  }
}

export default new DeliverymenController();
