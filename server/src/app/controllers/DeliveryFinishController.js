import * as Yup from 'yup';
import { format } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Order from '../models/Order';

class OrderFinnishController {
  async update(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number()
        .required()
        .positive()
        .integer(),
      signature_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid({ ...req.params, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { order_id } = req.params;
    const { signature_id } = req.body;
    /**
     * Check if order is opened
     */
    const order = await Order.findOne({
      where: {
        id: order_id,
        canceled_at: null,
        start_date: { [Op.ne]: null },
        end_date: null,
      },
    });

    if (!order) {
      return res.status(401).json({ error: 'Order was not found' });
    }

    /**
     * Check if avatar exists
     */
    if (!(await File.findByPk(signature_id))) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
      end_date,
      status,
    } = await order.update({ end_date: new Date(), signature_id });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date: format(start_date, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      end_date: format(end_date, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      status,
    });
  }
}

export default new OrderFinnishController();
