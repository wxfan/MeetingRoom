import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { AppDataSource } from './data-source';
import roomRoutes from './routes/roomRoutes';

const app = express();
const PORT = 4000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

app.use(roomRoutes);
app.use('/api/rooms', roomRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch(error => console.error('Database connection error:', error));