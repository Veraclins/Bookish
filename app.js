import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import router from './routes';
import passportConfig from './config/passportConfig';


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


/* eslint-disable no-console */
app.listen(PORT, (err) => {
  if (!err) console.log(`The server is live on port ${PORT}`);
  else {
    console.log(`An error occured while binding to port${PORT}`);
  }
});

export default app;
