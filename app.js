import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import router from './routes';
import passportConfig from './config/passportConfig';

import passport from 'passport';
import authRoutes from './routes/auth';

require('./config/passport');

const app = express();
const { PORT = 3000 } = process.env;
app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: 'I love Myself' }));

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


<<<<<<< HEAD
app.use(passport.initialize());

=======
app.use('/api/v1', routes);
>>>>>>> work in progress
app.all('/', (req, res) => {
  res.send({
    status: 'success',
    data: 'Welcome to Bookish, An API for book lovers',
  });
});

app.use('/api/v1/auth', authRoutes);

/* eslint-disable no-console */
app.listen(PORT, (err) => {
  if (!err) console.log(`The server is live on port ${PORT}`);
  else {
    console.log(`An error occured while binding to port${PORT}`);
  }
});

export default app;
