import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { AppDataSource } from './data-source';
import roomRoutes from './routes/roomRoutes';
import zoneRoutes from './routes/zoneRoutes';
import seatRoutes from './routes/seatRoutes';
import personRoutes from './routes/personRoutes'; // Import person routes
import assignmentRoutes from './routes/assignmentRoutes'; // Import assignment routes
import seatMaintenanceRoutes from './routes/seatMaintenanceRoutes'; // Import seatMaintenance routes
import meetingRoutes from './routes/meetingRoutes';

const app = express();
const PORT = 4000;

// 中间件
app.use(cors());
app.use(bodyParser.json());


app.use('/api/rooms', roomRoutes); // Use room routes
app.use('/api/zones', zoneRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/persons', personRoutes); // Use person routes
app.use('/api/assignments', assignmentRoutes); // Use assignment routes
app.use('/api/seat-maintenances', seatMaintenanceRoutes); // Use seatMaintenance routes
app.use('/meetings', meetingRoutes);


// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch(error => console.error('Database connection error:', error));