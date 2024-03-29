import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
const app = express();
config();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map