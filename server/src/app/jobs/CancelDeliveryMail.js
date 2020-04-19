import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancel-delivery',
      context: {
        deliveryId: order.id,
        problems: order.problems,
        deliveryman: order.deliveryman.name,
        recipient: order.recipient,
        product: order.product,
        canceledAt: format(
          parseISO(order.canceled_at),
          "'dia' dd 'de' MMMM', às 'H:mm'h.'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelDeliveryMail();
