import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://alexlatypov94:Hdz6DT5PyuEtv0Rn@fayrix-test.kco6hhb.mongodb.net/fayrix-test?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
