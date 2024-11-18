const amqp = require("amqplib/callback_api.js");

class Receive {
  constructor(queueName = "mediumQueue") {
    this.rabbit = amqp;
    this.queueName = queueName;
  }

  execute(consumer) {
    amqp.connect(process.env.RABBIT_URL_AWS, (error, connection) => {
      if (error) {
        throw error;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        channel.assertQueue(this.queueName, {
          durable: true,
        });
        channel.consume(this.queueName, consumer, {
          noAck: true,
        });
      });
    });
  }
}

module.exports = Receive;
