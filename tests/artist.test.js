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

    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });
    
  
    describe('POST /artists', () => {
      it('creates a new artist in the database', (done) => {
        request(app)
          .post('/artists')
          .send({
            name: 'Tame Impala',
            genre: 'Rock',
          })
          .then(response => {
            console.log(response.status);
            expect(response.status).to.equal(201);
            console.log(response.body);
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




