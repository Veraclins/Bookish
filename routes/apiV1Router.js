import { Router } from 'express';
import authRouter from './v1/authRouter';
import booksRouter from './v1/booksRouter';

const apiV1Router = Router();

apiV1Router.use('/auth', authRouter);
apiV1Router.use('/books', booksRouter);
export default apiV1Router;
