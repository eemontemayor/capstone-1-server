const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeMealsArray(users) {
  return [
    {
      id: 1,
      meal_name: 'First test Meal!',
      image: 'http://placehold.it/500x500',
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      meal_name: 'Second test Meal!',
      image: 'http://placehold.it/500x500',
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      meal_name: 'Third test Meal!',
      image: 'http://placehold.it/500x500',
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      meal_name: 'Fourth test Meal!',
      image: 'http://placehold.it/500x500',
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}



function makeMealsFixtures() {
  const testUsers = makeUsersArray()
  const testMeals = makeMealsArray(testUsers)
  return { testUsers, testMeals }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      capstone1_meals,
      capstone1_users`
  )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
       ...user,
       password: bcrypt.hashSync(user.password, 1)
     }))
     return db.into('capstone1_users').insert(preppedUsers)
       .then(() =>
         // update the auto sequence to stay in sync
         db.raw(
           `SELECT setval('capstone1_users_id_seq', ?)`,
           [users[users.length - 1].id],
         )
       )
 }

function seedMealsTables(db, users, Meals) {
  return seedUsers(db,users)
    .then(()=> db.into('capstone1_meals').insert(Meals))
  
}
// function seedMealsTables(db, users, Meals, reviews=[]) {
//   return db.transaction(async trx => {
//     await seedUsers(trx, users);
//     await trx.into('Mealful_Meals').insert(Meals);
//     await trx.raw(
//       `SELECT setval('Mealful_Meals_id_seq', ?)`,
//       [Meals[Meals.length - 1].id],
//     ) 
//   }).then(() =>
//       reviews.length && db.into('Mealful_reviews').insert(reviews)
//     )
// }




function makeAuthHeader(user, secret = process.env.JWT_SECRET){
  const token = jwt.sign({user_id: user.id}, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
   return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeMealsArray,


  makeMealsFixtures,
  cleanTables,
  seedMealsTables,
 
  makeAuthHeader,
  seedUsers,
}