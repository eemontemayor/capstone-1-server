const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-service')
const {requireAuth} = require('../middleware/jwt-auth')


mealsRouter
.post('/',requireAuth, jsonBodyParser, (req,res,next)=>{
   
    const newMeal = req.body;
    
    newMeal.user_id = req.user.id;
    // if validated then
    mealService.insertMeal(
        req.app.get('db'),
        newMeal
    )
    .then((meal) => { 
      return res.json(mealService.serializeMeal(meal)).status(201)
     
    }) 
    .catch(next);
})

.get('/', requireAuth, (req,res, next)=>{ // TO-DO fix promise created by require Auth which is logging out warning
  
    const user_id = req.user.id
   
    mealService.getMeals(
        req.app.get('db'),
        user_id
    )
    .then((meals) => {
   
        return res.json(meals.map(i => mealService.serializeMeal(i))).status(201)
    })
    .catch(next);
})
.delete('/', (req,res,next)=>{
    let mealId = req.body
    mealService.deleteMeal(
        req.app.get('db'),
        mealId
    )
  
})
module.exports = mealsRouter
