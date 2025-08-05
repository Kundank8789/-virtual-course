import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectdb.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});
