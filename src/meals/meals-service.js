const mealService = {
    insertMeal(db, newMeal){
        console.log(newMeal)
    return db
    .insert(newMeal)
    .into('capstone1_meals')
    .returning('*')
    .then(([meal])=> console.log(meal))
    },
}
module.exports = mealService