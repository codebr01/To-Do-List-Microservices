import amqp from 'amqplib/callback_api';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) throw error0;

  connection.createChannel((error1, channel) => {
    if (error1) throw error1;

    const queue = 'token_validation_request';
    channel.assertQueue(queue, { durable: true });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    // Consumindo a fila de validação do token
    channel.consume(queue, (msg) => {
      if (!msg) {
        console.log(" [x] Message is null or undefined.");
        return; // Se a mensagem for null ou undefined, sai da função
      }

      const token = msg.content.toString();
      console.log(' [x] Received token for validation:', token);

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error("JWT_SECRET is missing in environment variables.");
        return;
      }

      // Verificando a validade do token
      jwt.verify(token, jwtSecret, (err, user) => {
        const result = err ? 'invalid' : 'valid';

        // Envia a resposta para a fila de validação
        channel.assertQueue('token_validation_response', { durable: true });
        channel.sendToQueue('token_validation_response', Buffer.from(result), { persistent: true });

        console.log(` [x] Sent validation response: ${result}`);
      });
    }, { noAck: true });
  });
});
