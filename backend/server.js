import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seeds/seedData.js';

import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/stats', statsRoutes);

// Base health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Satyam Portfolio API active' });
});

// Start Server and connect database
const startServer = async () => {
  await connectDB();
  await seedDatabase();
  
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Satyam Portfolio Server running on port ${PORT}`);
    console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
