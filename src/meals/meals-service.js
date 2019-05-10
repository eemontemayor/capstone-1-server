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


        
    getMeals(db, user_id){
        return db.select('*').from('capstone1_meals').where({user_id});
        }, 





    deleteMeal(db, id){
        
        
        return db('capstone1_meals')
        .where({id})
        .delete() 
    },   




    serializeMeal(meal){
        return {
            id: meal.id,
            meal_name: meal.meal_name,
            ingredients: meal.ingredients,
            on_day: meal.on_day,
            user_id: meal.user_id
        }
    },

}
module.exports = mealService