import { Router } from 'express';
import apiV1Router from './apiV1Router';

const router = Router();

router.use('/api/v1', apiV1Router);

router.get('/*', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Bookish, An API for book lovers',
  });
});

export default router;
