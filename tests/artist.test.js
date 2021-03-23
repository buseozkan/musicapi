const { expect } = require('chai');
const request = require('supertest');
const { Artist } = require('../src/models');
const app = require('../src/app');

describe('/artists', () => {
  before(async () => {
    try {
      await Artist.sequelize.sync();
    } catch (error) {
      throw error;
    }
  });


  beforeEach(async () => {
    try {
      await request(app).post('/artists').send({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      await request(app).post('/artists').send({
        name: 'Hannah Montana',
        genre: 'Pop',
      });
      await request(app).post('/artists').send({
        name: 'JLO',
        genre: 'Hip Hop',
      });
    } catch (error) {
      throw error;
    }
  });


  afterEach(async () => {
    try {
      await Artist.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  });




  describe('POST /artists', () => {
    it('creates a new artist in the database', async () => {
      try {
        const response = await request(app).post('/artists').send({
          name: 'Billie Eilish',
          genre: 'Pop',
        });
        expect(response.status).to.equal(201);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('GET /artists', () => {
    it('gets all artist records', async () => {
      try {
        const response = await request(app).get('/artists').send();
        expect(response.body).to.have.lengthOf(3);
      } catch (error) {
        throw error;
      }
    });

    it('should get an artist by id', async () => {
      try {
        const artistList = await request(app).get('/artists').send();
        const sampleArtistId = artistList.body[0].id;
        const artistByIdResponse = await request(app).get(`/artists/${sampleArtistId}`).send();
        expect(artistByIdResponse.status).to.equal(200);
        console.log(artistByIdResponse);
        expect(artistByIdResponse.body.id).to.equal(sampleArtistId);
      } catch (error) {
        throw error;
      }
    });
  });



  describe('PATCH /artists/:id', () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ])
        .then((documents) => {
          artists = documents;
          done();
        })
        .catch((error) => done(error));
    });

    it('updates artist genre by id', (done) => {
      const artist = artists[0];
      request(app)
        .patch(`/artists/${artist.id}`)
        .send({ genre: 'Psychedelic Rock' })
        .then((res) => {
          expect(res.status).to.equal(200);
          Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
            expect(updatedArtist.genre).to.equal('Psychedelic Rock');
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });


    it('updates artist name by id', (done) => {
      const artist = artists[0];
      request(app)
        .patch(`/artists/${artist.id}`)
        .send({ name: 'Sting' })
        .then((res) => {
          expect(res.status).to.equal(200);
          Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
            expect(updatedArtist.name).to.eql('Sting');
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });
  });
});
