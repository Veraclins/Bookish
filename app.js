import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import authGoogleRoutes from './routes/authgoogle-routes';
import './config/passport';

dotenv.config();


const app = express();
const { PORT = 3000 } = process.env;
app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: 'I love Myself' }));

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
app.use('/api/v1/auth', authGoogleRoutes);

/* eslint-disable no-console */
export const server = app.listen(PORT, () => {
  if (app.get('env') === 'development') console.log(`The server is live on port ${PORT}`);
});

export default app;
