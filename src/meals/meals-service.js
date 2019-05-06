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
        }, // TO-DO select only meals from user

    serializeMeal(meal){
        console.log(meal)
        console.log('^^^from post at serialize^^^^^')
        return {
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService