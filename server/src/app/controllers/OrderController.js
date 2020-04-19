import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Order from '../models/Order';
import Problem from '../models/Problem';
import Recipient from '../models/Recipient';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const { page = 1, limit = 5, product } = req.query;

    let whereStatement = {};
    if (product) {
      whereStatement = {
        product: {
          [Op.iLike]: `%${product}%`,
        },
      };
    }

    const { count, rows } = await Order.findAndCountAll({
      where: whereStatement,
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
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
        },
      ],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
        'created_at'
      ],
    });

    return res.json({ count, orders: rows });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { order_id } = req.params;
    const order = await Order.findByPk(order_id, {
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
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
        },
      ],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
      ],
    });

    if (!order) {
      return res.status(401).json({ error: 'Order does not exist' });
    }

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .required()
        .positive()
        .integer(),
      deliveryman_id: Yup.number()
        .required()
        .positive()
        .integer(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    /**
     * Check if recipient exist
     */
    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    /**
     * Check if deliveryman exist
     */
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const order = await Order.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      order,
      recipient: recipientExists,
      deliveryman: deliverymanExists,
    });

    return res.json({
      id: order.id,
      product: order.product,
      recipient: recipientExists,
      deliveryman: deliverymanExists,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .required()
        .positive()
        .integer(),
      recipient_id: Yup.number()
        .required()
        .positive()
        .integer(),
      deliveryman_id: Yup.number()
        .required()
        .positive()
        .integer(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { order_id } = req.params;
    const { recipient_id, deliveryman_id } = req.body;

    /**
     * Check if recipient exist
     */
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(401).json({ error: 'Order does not exist' });
    }

    /**
     * Check if recipient exist
     */
    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    /**
     * Check if deliveryman exist
     */
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    const { id, product } = await order.update({ ...req.body });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { order_id } = req.params;
    const order = await Order.findByPk(order_id, {
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id', 'description'],
          order: [['id', 'DESC']],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
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
        },
      ],
    });

    if (!order) {
      return res.status(401).json({ error: 'Order does not exist' });
    }

    await order.update({ canceled_at: new Date() });

    await Queue.add(CancelDeliveryMail.key, { order });

    return res.json({ ok: true });
  }
}

export default new OrderController();
