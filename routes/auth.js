import express from 'express';
import passportGitHub from '../authentication/github';

const routes = express.Router();


routes.get('/login', (req, res) => {
  res.send(res.send({
    status: 'success',
    data: 'Welcome to Bookish, An API for book lovers',
  }));
});

/* GITHUB ROUTER */
routes.get('/github',
  passportGitHub.authenticate('github', { scope: ['email'] }));

routes.get('/github/callback',
  passportGitHub.authenticate('github', { session: false }), (req, res) => {
    res.status(200).json({
      message: 'Github.com data:',
      data: req.user,
    });
  });


export default routes;
