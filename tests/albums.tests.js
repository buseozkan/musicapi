const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');

describe('/albums', () => {
    let artists;
    before(async () => {
        try{
            await Artist.sequelize.sync();
            await Album.sequelize.sync();
        } catch (err) {
            console.log(err);
        }
    });


    beforeEach(async () => {
        try {
            await Artist.destroy({ where: {} });
            await Album.destroy({ where: {} });
            artist = await Artist.create({
                name: 'JLO',
                genre: 'Hip Hop',
            });
        } catch (err) {
            console.log(err);
        }
    });
    
    describe('POST /artists/:artistId/albums', () => {
        xit('creates a new album for a given artist', (done) => {
            request(app)
            .post('/artists/${artist.id}/albums')
            .send({
                name: 'Brave',
                year: 2007,
            })
            .then((res) => {
                expect(res.status).to.equal(201);

                Album.findById(res.body.id, { raw: true }).then((album) => {
                    expect(album.name).to.equal('Brave');
                    expect(album.year).to.equal(2007);
                    expect(album.artistId).to.equal(artist.id);
                    done();
                }).catch(error => done(error));
            }).catch(error => done(error));
        });


       xit('returns a 404 and does not create an album if the artist does not exist', (done) => {
            request(app)
            .post('/artists/1234/albums')
            .send({
                name: 'Brave',
                year: 2007,
            })
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('the artist could not be found.');

                Album.findAll().then((albums) => {
                    expect(albums.length).to.equal(0);
                    done();
                });
            });
        });
    });
});