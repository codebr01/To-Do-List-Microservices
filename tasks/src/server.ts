import express from 'express';
import { router } from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

const app = express();
app.use(express.json());
app.use(router);

app.listen(3002, () => {
  console.log('Server running on port 3002');
});
