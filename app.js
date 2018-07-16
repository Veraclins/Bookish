import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const { PORT = 3000 } = process.env;

// Middlewares
app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.all('/', (req, res) => {
  res.send({
    status: 'success',
    data: 'Welcome to Bookish, An API for book lovers',
  });
});

/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
