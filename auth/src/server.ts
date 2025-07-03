import express from 'express';
import { router } from './routes';
import './tokenValidation'; // Importa o arquivo tokenValidation.ts para que ele seja executado.

const app = express();
app.use(express.json()); 
app.use(router);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
