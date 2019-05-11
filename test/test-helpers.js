const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: '$2a$12$zQv6kAQ.HRVDR4XchlEnnOS3.j1JStw9DExKVeSpsTbI8OLX6Va5q',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: '$2a$12$zQv6kAQ.HRVDR4XchlEnnOS3.j1JStw9DExKVeSpsTbI8OLX6Va5q',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeMealsArray(users) {
  return [
    {
      id: 1,
      meal_name: 'First test Meal!',
      on_day: '2029-01-22T06:00:00.000Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      date_created:'2028-01-21T06:00:00.000Z',
      bookmarked: false,
      user_id: users[0].id,
    },
    {
      id: 2,
      meal_name: 'Second test Meal!',
      on_day: '2029-01-21T06:00:00.000Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      date_created:'2028-01-21T06:00:00.000Z',
      bookmarked: false,
      user_id: users[0].id,
    },
    {
      id: 3,
      meal_name: 'Third test Meal!',
      on_day: '2029-01-24T06:00:00.000Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      date_created:'2028-01-21T06:00:00.000Z',
      bookmarked: false,
      user_id: users[0].id,
    },
    {
      id: 4,
      meal_name: 'Fourth test Meal!',
      on_day: '2029-01-23T06:00:00.000Z',
      ingredients: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      date_created:'2028-01-21T06:00:00.000Z',
      bookmarked: false,
      user_id: users[0].id,
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

function makeExpectedMeal(users, meal) {
    const user = users
      .find(user => user.id === meal.user_id)
  

  

    return {
      id: meal.id,
      meal_name: meal.meal_name,
      on_day: meal.on_day,
      ingredients: meal.ingredients,
      image: meal.image,
      date_created:meal.date_created,
      bookmarked:meal.bookmarked,
      user_id: meal.user_id,
    }
  }


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
  makeExpectedMeal,

  makeMealsFixtures,
  cleanTables,
  seedMealsTables,
 
  makeAuthHeader,
  seedUsers,
}