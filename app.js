import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv'
config();


import { verifySession } from './src/middlewares/verifySession.js';
import shopRoutes from './src/routes/shopRoutes.js'
import authRoutes from './src/routes/authRoutes.js';
import { connectToDB } from './src/utils/mongoose.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(verifySession);

app.use(authRoutes);
app.use(shopRoutes);


try {
    await connectToDB();
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit the process if there's a connection error
  }

app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));

export default app