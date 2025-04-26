import cors from 'cors';
import express from 'express';
import routes from './routers';
import errorHandler from './middleware/exception';
import { AppError } from './utils/app_error';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

app.get('/healthcheck', (req, res) => {
  var data = new Date();
  res.status(200).json({ status: `api plataforma de cursos esta online - ${data}` });
});

// ✅ Middleware de erro no fim
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
