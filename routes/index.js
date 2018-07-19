import { Router } from 'express';
import apiV1Router from './apiV1Router';

const router = Router();

router.use('/api', apiV1Router);


router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Bookish, An API for book lovers',
  });
});

router.all('/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Specified resource was not found',
  });
});

export default router;
