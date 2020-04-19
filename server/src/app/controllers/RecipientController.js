import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
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

    const { count, rows } = await Recipient.findAndCountAll({
      where: whereStatement,
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']],
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zip_code',
      ],
    });

    return res.json({ count, recipients: rows });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id } = req.params;
    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(6),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string().nullable(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .required()
        .positive()
        .integer(),
      name: Yup.string()
        .required()
        .min(6),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string().nullable(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id } = req.params;
    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await recipient.update({ id: recipient_id, ...req.body });

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id } = req.params;
    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    await recipient.destroy();
    return res.json({ ok: true });
  }
}

export default new RecipientController();
