import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;