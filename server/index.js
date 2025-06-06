import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/book.js'

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});