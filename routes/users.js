import { Router } from 'express';

import usersController from '../controllers/users';

const usersRouter = Router();

usersRouter.post('/create', usersController.createUser);


export default usersRouter;
