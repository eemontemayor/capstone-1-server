const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-service')
mealsRouter
.post('/', jsonBodyParser, (req,res,next)=>{
    console.log('++++++++++++++++++++')
    const newMeal = req.body.new_meal;
    // if validated then
    mealService.insertMeal(
        req.app.get('db'),
        newMeal
    )
    .then(meal => console.log(meal))
})
module.exports = mealsRouter
