import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectdb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
dotenv.config();
import cors from 'cors';
import userRouter from './routes/userRoutes.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});
