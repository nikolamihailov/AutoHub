import express from 'express';
// import mongoose from 'mongoose';

const app = express();
const PORT = 5173;

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  res.send('working');
});

app.listen(PORT, () => {
  console.log(`I am listening boy, everything I hear is on - ${PORT} port`);
});
