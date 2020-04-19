import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { order, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'new-delivery',
      context: {
        deliveryman: deliveryman.name,
        recipient,
        product: order.product,
        createdAt: format(
          parseISO(order.createdAt),
          "'dia' dd 'de' MMMM', às 'H:mm'h.'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new NewDeliveryMail();
