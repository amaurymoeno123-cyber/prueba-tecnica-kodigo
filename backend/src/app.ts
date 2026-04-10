import express from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticket.routes';
import agentRoutes from './routes/agent.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Health check for Docker
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/agents', agentRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
