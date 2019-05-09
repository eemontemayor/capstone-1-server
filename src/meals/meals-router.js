const express = require('express')
const mealsRouter= express.Router()
const jsonBodyParser= express.json()
const mealService = require('./meals-service')
const {requireAuth} = require('../middleware/jwt-auth')


mealsRouter
.post('/',requireAuth, jsonBodyParser, (req,res,next)=>{
   
    const newMeal = req.body;
    newMeal.user_id = req.user.id;
    
    mealService.insertMeal(
        req.app.get('db'),
        newMeal
    )
    .then((meal) => { 
        return mealService.serializeMeal(meal[0])
    }) 
    .then(meal =>{
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log(meal.id)    // HOW DO I SEND THIS ID BACK TO FRONT END????????????
        return res.status(201).json(meal)              // .location(`/meals/${meal.id}`)
    })
    .catch(next);
})

.get('/', requireAuth, jsonBodyParser,(req,res, next)=>{ // TO-DO fix promise created by require Auth which is logging out warning
  
    const user_id = req.user.id

    mealService.getMeals(
        req.app.get('db'),
        user_id
    )
    .then((meals) => {
        return res.json(meals.map(i => mealService.serializeMeal(i)))
    })
    .catch(next);
})



.delete('/', jsonBodyParser,(req,res,next)=>{
    let id = req.body.id
    
    mealService.deleteMeal(
        req.app.get('db'),
        id
    )
    .then(meal =>{
        res.status(204).end()
    })
    .catch(next)
    
  
})
module.exports = mealsRouter
