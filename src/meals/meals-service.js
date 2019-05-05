const mealService = {
    // getById(db, id){

    // },

    insertMeal(db, newMeal){
        return db
        .insert(newMeal)
        .into('capstone1_meals')
        .returning('*')
        .then(([meal])=> console.log("here")) //TO-DO fix responses
        },

    getMeals(db){
        return db.select('*').from('capstone1_meals');
        },

    serializeMeal(meal){
        return {
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService