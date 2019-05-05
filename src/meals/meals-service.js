const mealService = {
    
    insertMeal(db, newMeal){
        return db
        .insert(newMeal)
        .into('capstone1_meals')
        .returning('*')
        .then(meal=> {
            return meal  
        })
        },

    getMeals(db){
        return db.select('*').from('capstone1_meals');
        },

    serializeMeal(meal){
        console.log(meal)
        return {
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService