const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe('Meals Endpoints', function() {
  let db;

  const {
    testUsers,
    testMeals,
  } = helpers.makeMealsFixtures();



  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  beforeEach('insert meals', () =>
  helpers.seedMealsTables(
    db,
    testUsers,
    testMeals,
  )
);


describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, 'Hello, world!')
  })
})

  describe('GET /api/meals', () => {
    context('Given there are meals in the database', () => {
      it('responds with 200 and all of the meals', () => {
        const expectedMeals = testMeals.map(meal =>
          helpers.makeExpectedMeal(
            testUsers,
            meal
          )
        );
        return supertest(app)
          .get('/api/meals')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedMeals);
      });
    });
  });
   


});
