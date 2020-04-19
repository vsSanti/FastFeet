import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliveryController {
  async show(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .required()
        .positive()
        .integer(),
      status: Yup.string(),
    });

    if (!(await schema.isValid({ ...req.query, ...req.params }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let { page = 1 } = req.query;
    if (page <= 0) page = 1;
    const { deliveryman_id } = req.params;
    const { status } = req.query;

    /**
     * Check if deliveryman exists
     */
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman does not exist' });
    }

    let whereStatement = { deliveryman_id };

    if (status === 'pending') {
      whereStatement = {
        ...whereStatement,
        [Op.and]: [{ canceled_at: null }, { end_date: null }],
      };
    } else if (status === 'finished') {
      whereStatement = {
        ...whereStatement,
        [Op.and]: [{ canceled_at: null }, { end_date: { [Op.ne]: null } }],
      };
    }

    const orders = await Order.findAll({
      where: whereStatement,
      limit: 5,
      offset: (page - 1) * 5,
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
            'full_address',
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
        'createdAt',
      ],
      order: [['id', 'ASC']],
    });

    const filteredOrders = orders;

    return res.json(filteredOrders);
  }
}

export default new DeliveryController();
