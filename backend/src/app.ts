import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cookieParser from 'cookie-parser'; // NEW: parser cookie per leggere authToken dai cookie
import reportRouter from './routes/reportRouter';
import userRouter from './routes/userRouter';

const app = express();

const isDocker = process.env.IS_DOCKER === 'true';
const swaggerPath = isDocker
  ? '/app/doc/OpenAPI_swagger.yml'        // dentro container
  : '../doc/OpenAPI_swagger.yml'; // locale

const swaggerDocument = YAML.load(swaggerPath);

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // NEW: abilita req.cookies prima dei router (necessario per verifyAuth e logout)
app.use('/api/auth', authRouter); // NEW: path modificato, prima era /api/auth --> non sarebbe andato bene per api/user (registrazione)
app.use('/api/reports', reportRouter);
app.use('/api/users', userRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // CHANGED: spostata la UI Swagger su /api/docs per non interferire con /api/*

app.use((err: any, _req: any, res: any, _next: any) => {
  // NEW: se il body JSON è malformato, restituiamo 400 (allineato ai test)
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid JSON' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/', (_req, res) => {
  res.send('Backend is running');
});

export default app;