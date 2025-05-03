import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import companyRoutes from './routes/company.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Mount the company routes under /api/company
app.use('/api/company', companyRoutes);

// A catch-all to log any unmatched routes
app.use((req, res) => {
  console.log(`❓ Unmatched route: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `No handler for ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('🔥 Unhandled Error:', err);
  res.status(500).json({ error: err.message || 'Server error' });
});

// Start
const PORT = Number(process.env.PORT) || 5001;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Company service running on port ${PORT}`));
});
