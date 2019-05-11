const knex = require('knex')
const app = require('../src/app')

describe('Meals Endpoints', function(){


    describe(`GET /api/meals`, () => {
        context(`Given no meals`, () => {
          it.skip(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/meals')
              .expect(200, [])
          })
        })
    })    
})