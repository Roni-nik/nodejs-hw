import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from "cookie-parser";

import { errors } from "celebrate";
import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

import authRoutes from './routes/authRoutes.js';
// import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;




app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors());         // 3. Дозвіл для запитів з інших доменів
app.use(cookieParser());
app.use(authRoutes);
app.use(notesRoutes);




app.use(notFoundHandler);
// Error — якщо під час запиту виникла помилка

// обробка помилок від celebrate (валідація)
app.use(errors());
app.use(errorHandler);

await connectMongoDB();






// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
