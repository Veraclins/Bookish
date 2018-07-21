import { Router } from 'express';
import authRouter from './v1/authRouter';
import booksRouter from './v1/booksRouter';
import TokenService from '../services/TokenService';
import AuthController from '../controllers/AuthController';

const apiV1Router = Router();

// Already has /api/v1 appended to the route
apiV1Router.use('/auth', authRouter, AuthController.sendResponse);
apiV1Router.use('/books', TokenService.decodeToken, booksRouter);
export default apiV1Router;
