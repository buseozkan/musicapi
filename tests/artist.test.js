/*
const { expect } = require('chai');
const request = require('supertest');

artists.test.js 
const { Artist } = require('../src/models');
const app = require('../src/app');


describe('/artists', () => {
    before(done => {
        Artist.sequelize
        .sync()
        .then(() => done())
        .catch(error => done(error));
    });
    beforeEach(done => {
        Artist.destroy({ where: {} })
        .then(() => done()).catch(error => done(error));
    });
});

describe('POST /artists', (done) => {
    it('creates a new artist in the database', () => {
        request(app).post('/artists').send({
            name: 'Tame Impala',
            genre: 'Rock',
        }).then(response => {
            console.log(response.status);
            expect(response.status).to.equal(201);
            done();
        }).catch(error => done(error));
    });
});
*/
/* tests/artists.test.js */
const { expect } = require('chai');
const request = require('supertest');
const { Artist } = require('../src/models');
const app = require('../src/app');

describe('/artists', () => {
    before(done => {
      Artist.sequelize
        .sync()
        .then(() => done())
        .catch((error) => done(error));
    })
  
    beforeEach(done => {
      Artist.destroy({ where: {} })
        .then(() => done())
        .catch(error => done(error));
    })

    
    
  
    describe('POST /artists', () => {
      it('creates a new artist in the database', (done) => {
        request(app)
          .post('/artists')
          .send({
            name: 'Tame Impala',
            genre: 'Rock',
          })
          .then(response => {
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal('Tame Impala');
            expect(response.body.genre).to.equal('Rock');
            return Artist.findByPk(response.body.id, { raw: true });
          })
          .then((insertedArtistRecords) => {
            expect(insertedArtistRecords.name).to.equal('Tame Impala');
            expect(insertedArtistRecords.genre).to.equal('Rock');
            done();
          })
          .catch((error) => done(error));
      });

    });
});



describe('with artists in the database', () => {
  let artists;
  beforeEach((done) => {
    Promise.all([
      Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
      Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
      Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
    ]).then((documents) => {
      artists = documents;
      done();
    }).catch(error => {
      console.log(error);
      res.status(400).send();
    });
  });

  describe('GET /artists', () => {
    it('gets all artist records', (done) => {
      request(app)
      .get('/artists')
      .then((res) => {
        expect(res.status).to.equal(200);
        console.log(res.body);
        expect(res.body.length).to.deep.equal(3);
        
        res.body.forEach((artist) => {
          const expected = artists.find((a) => a.id.toString() === artist.id);
          expect(artist.name).to.equal(expected.name);
          expect(artist.genre).to.equal(expected.genre);
        });
        done();
      })
      .catch(error => {
        console.log(error);
        res.status(400).send();
      });
    });
  });
});
