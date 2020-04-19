import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Problem from '../models/Problem';
import Recipient from '../models/Recipient';

import CancelDeliveryMail from '../jobs/CancelDeliveryMail';
import Queue from '../../lib/Queue';

class ProblemController {
  async index(req, res) {
    const { page = 1, limit = 5, description } = req.query;

    let whereStatement = {};
    if (description) {
      whereStatement = {
        description: {
          [Op.iLike]: `%${description}%`,
        },
      };
    }

    const { count, rows } = await Problem.findAndCountAll({
      where: whereStatement,
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'DESC']],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
            'status',
          ],
          include: [
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
        },
      ],
      attributes: ['id', 'description', 'createdAt'],
    });

    return res.json({ count, problems: rows });
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .integer()
        .positive()
        .nullable(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if order exists
     */
    const { order_id } = req.params;
    const order = await Order.findByPk(order_id, {
      include: [
        {
          model: Problem,
          as: 'problems',
          attributes: ['id', 'description', 'created_at'],
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
      order: [['id', 'DESC']],
    });

    if (!order) {
      return res.status(401).json({ error: 'Order does not exist' });
    }

    return res.json(order.problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .integer()
        .positive()
        .nullable(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if order exist
     */
    const { order_id } = req.params;
    const orderExists = await Order.findByPk(order_id);

    if (!orderExists) {
      return res.status(401).json({ error: 'Order does not exist' });
    }

    const { id, description } = await Problem.create({
      order_id,
      ...req.body,
    });

    return res.json({
      id,
      order_id: orderExists.id,
      description,
    });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      problem_id: Yup.number()
        .integer()
        .positive()
        .nullable(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check if order exist
     */
    const { problem_id } = req.params;
    const problem = await Problem.findByPk(problem_id);

    if (!problem) {
      return res.status(401).json({ error: 'Problem does not exist' });
    }

    const order = await Order.findOne({
      where: {
        id: problem.order_id,
        canceled_at: null,
      },
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
      return res
        .status(401)
        .json({ error: 'Order does not exist or already is canceled' });
    }

    await order.update({ canceled_at: new Date() });

    await Queue.add(CancelDeliveryMail.key, { order });
    return res.json(order);
  }
}

export default new ProblemController();
