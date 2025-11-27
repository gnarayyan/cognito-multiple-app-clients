import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Cognito Auth PoC API is running');
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
