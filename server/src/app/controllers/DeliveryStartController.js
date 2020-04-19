import * as Yup from 'yup';
import {
  setHours,
  setMinutes,
  setSeconds,
  format,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';

class DeliveryStartController {
  async update(req, res) {
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
    /**
     * Check if order is opened
     */
    const order = await Order.findOne({
      where: {
        id: order_id,
        canceled_at: null,
        start_date: null,
        end_date: null,
      },
    });

    if (!order) {
      return res.status(401).json({ error: 'Order was not found' });
    }

    const startWorkHour = setSeconds(
      setMinutes(setHours(new Date(), '08'), '00'),
      0
    );
    const finnishWorkhHour = setSeconds(
      setMinutes(setHours(new Date(), '18'), '00'),
      0
    );
    const start_date = new Date();

    /**
     * Check if it's work hour
     */
    if (
      isBefore(start_date, startWorkHour) ||
      isAfter(start_date, finnishWorkhHour)
    ) {
      return res
        .status(401)
        .json({ error: 'Order must be withdrawn between 8AM and 6PM' });
    }

    /**
     * Check number of daily withdrawals
     */
    const withdrawalsCount = await Order.count({
      where: {
        deliveryman_id: order.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
        canceled_at: null,
      },
    });

    if (withdrawalsCount >= 5) {
      return res
        .status(401)
        .json({ error: 'Deliveryman already reached daily delivery count' });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      end_date,
      status,
    } = await order.update({ start_date });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date: format(start_date, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      end_date,
      status,
    });
  }
}

export default new DeliveryStartController();
