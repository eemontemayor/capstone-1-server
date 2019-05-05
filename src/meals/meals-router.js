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
    .then(meal => {
        res.status(201).json(mealService.serializeMeal(meal))
    }) // TO-DO fix responses
})

.get('/', (req,res, next)=>{
    
    mealService.getMeals(
        req.app.get('db')
    )
    .then(meals => {
        return res.json(meals.map(i => mealService.serializeMeal(i)))
    })// TO-DO fix responses
    .catch(next);
})
module.exports = mealsRouter
