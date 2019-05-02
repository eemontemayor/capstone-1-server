const mealService = {
    insertMeal(db, newMeal){
        console.log('%%%%%%%%%%%%%%%')// got to here.. now i gotta format the database and figure out how to insert into that column
    return db
    .insert(newMeal)
    .into('capstone1_meals')
    .returning('*')
    .then(([meal])=> console.log(meal))
    },
}
module.exports = mealService