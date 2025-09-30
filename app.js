import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv'
config();
import jwt from 'jsonwebtoken';
import { verifySession } from './src/middlewares/verifySession.js';
import shopRoutes from './src/routes/shopRoutes.js'
import authRoutes from './src/routes/authRoutes.js'

const app = express();
 app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.use(cors())


import { connectToDB } from './src/utils/mongoose.js';
import { SECRET_JWT_KEY } from './src/config/config.js';

try {
    await connectToDB();
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit the process if there's a connection error
  }



app.use(authRoutes);
app.use(shopRoutes);
app.use(verifySession);



app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));

export default app