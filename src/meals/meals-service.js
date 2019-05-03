const mealService = {
    insertMeal(db, newMeal){
        console.log(newMeal)
    return db
    .insert(newMeal)
    .into('capstone1_meals')
    .returning('*')
    .then(([meal])=> console.log(meal))
    },
    getMeals(db){
        return db.select('*').from('capstone1_meals').then(meal => console.log(meal));
    }
}
module.exports = mealService