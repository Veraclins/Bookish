import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index'; // Server is defined in the api entry point (index.js)

const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/profiles/:username', () => {
  it('it should return a profile of the user with the provided username', (done) => {
    chai.request(server)
      .post('/api/profiles/:username')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('profile');
        expect(res.body).to.have.nested.property('profile.username');
        expect(res.body).to.have.nested.property('profile.bio');
        done();
      });
  });
});
