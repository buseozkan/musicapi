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
            .catch(error => done(error));
    })

    beforeEach(done => {
        Artist.destroy({ where: {} })
            .then(() => done()).catch(error => done(error));
    })

    describe('POST /artists', () => {
        it('creates a new artist in the database', (done) => {
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
});


