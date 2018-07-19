import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import router from './routes';
import passportConfig from './config/passportConfig';
import auth from './routes/auth';

const app = express();
const { PORT = 3000 } = process.env;

passportConfig(app);
app.use(session({ secret: process.env.SESSION_SECRET }));

// Middlewares
app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

app.use(passport.initialize());

app.use('/api/v1/auth', auth);
app.all('/', (req, res) => {
  res.send({
    status: 'success',
    data: 'Welcome to Bookish, An API for book lovers',
  });
});

/* eslint-disable no-console */
app.listen(PORT, (err) => {
  if (!err) console.log(`The server is live on port ${PORT}`);
  else {
    console.log(`An error occured while binding to port${PORT}`);
  }
});

export default app;
