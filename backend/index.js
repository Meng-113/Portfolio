import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import profileRoutes from './routes/profileRoute.js';
import quickInfoRoutes from './routes/quickInfoRoute.js';
import skillRoutes from './routes/skillRoute.js';
import projectRoutes from './routes/projectRoute.js';
import socialRoutes from './routes/socialRoute.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', profileRoutes);
app.use('/api', quickInfoRoutes);
app.use('/api', skillRoutes);
app.use('/api', projectRoutes);
app.use('/api', socialRoutes);

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()');
  res.send(`Database name is ${result.rows[0].current_database}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
