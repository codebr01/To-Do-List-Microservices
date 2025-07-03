import amqp from 'amqplib/callback_api';

// Função de envio para a fila
const sendToQueue = async (message: string, callback: (isValid: boolean) => void): Promise<void> => {
  // Conexão com o RabbitMQ via localhost
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      const queue = 'token_validation_request';
      channel.assertQueue(queue, { durable: true });

      // Envia o token para a fila RabbitMQ
      channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      console.log(" [x] Sent message to validation queue:", message);

      // Aguarda a resposta na fila 'token_validation_response'
      channel.assertQueue('token_validation_response', { durable: true });
      channel.consume('token_validation_response', (msg) => {
        if (msg && msg.content.toString() === "valid") {
          console.log(msg)
          callback(true); // Token válido
        } else {
          callback(false); // Token inválido
        }
      }, { noAck: true });
    });
  });

};

// Middleware de autenticação
const authenticateJWT = async (req: any, res: any, next: any): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  // Verifica se a mensagem já foi processada
  let isProcessed = false;

  // Envia o token para validação via RabbitMQ
  await sendToQueue(token, (isValid) => {
    if (isProcessed) {
      return; // Não faz nada se já foi processado
    }
    isProcessed = true; // Marca como processado

    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  });
};

export default authenticateJWT;
