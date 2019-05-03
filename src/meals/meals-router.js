const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-service')

const serializeMeal= meal =>({
    meal_name: meal.meal_name,
    ingredients: meal.ingredients,
    on_day: meal.on_day
})

mealsRouter
.post('/', jsonBodyParser, (req,res,next)=>{
   
    const newMeal = req.body;
    // if validated then
    mealService.insertMeal(
        req.app.get('db'),
        newMeal
    )
    .then(meal => console.log(meal)) // TO-DO fix responses
})
.get('/', (req,res, next)=>{
    
    mealService.getMeals(
        req.app.get('db')
    )
    .then(meals => {
        return res.json(meals.map(serializeMeal))
    })// TO-DO fix responses
})
module.exports = mealsRouter
