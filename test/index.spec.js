
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);
const { request, expect } = chai;


describe('DEFAULT ROUTES', () => {
  describe('GET /', () => {
    describe('status code', () => {
      it('should return be 200', (done) => {
        request(app).get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      describe('response bdy', () => {
        it('should have a message property', (done) => {
          request(app).get('/')
            .end((err, resp) => {
              expect(resp.body).property('message')
                .to.be.a('string');
              done();
            });
        });
        it('should have a status property', (done) => {
          request(app).get('/')
            .end((err, resp) => {
              expect(resp.body).property('status')
                .to.be.a('string');
              done();
            });
        });
      });
    });
  });

  describe('GET invalid Route', () => {
    describe('status code', () => {
      it('should return be 404', (done) => {
        request(app).get('/invalidRoute')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });

      describe('response bdy', () => {
        it('should have a message property', (done) => {
          request(app).get('/invalidRoute')
            .end((err, resp) => {
              expect(resp.body).property('message')
                .to.be.a('string');
              done();
            });
        });
        it('should have a status property', (done) => {
          request(app).get('/invalidRoute')
            .end((err, resp) => {
              expect(resp.body).property('status')
                .to.be.a('string');
              done();
            });
        });
      });
    });
  });
});
