// src/app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './routes/company.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

// ─── 1) ENABLE CORS ────────────────────────────────────────────────
app.use(
  cors({
    origin: 'http://localhost:3000',      // your React dev server
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
  })
);
// for older clients / explicit preflight
app.options('*', cors());

// ─── 2) JSON PARSER ────────────────────────────────────────────────
app.use(express.json());

// ─── 3) ROUTES ────────────────────────────────────────────────────
app.use('/api/company', companyRoutes);

// ─── 4) 404 CATCH-ALL ─────────────────────────────────────────────
app.use((req, res) => {
  console.warn(`❓ No route for ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: `No handler for ${req.method} ${req.originalUrl}` });
});

// ─── 5) GLOBAL ERROR HANDLER ───────────────────────────────────────
app.use(errorHandler);

export default app;
