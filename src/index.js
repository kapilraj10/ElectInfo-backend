import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import rouetr from './routes/auth.js';

dotenv.config();


connectDB();

const app = express();
const PORT = process.env.PORT || 1000;

// middleware
app.use(express.json());


app.use('/api/v1/auth', rouetr);

app.get('/', (req, res) => {
  res.send('Hello Developer from Express.js server!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
