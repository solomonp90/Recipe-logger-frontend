newRecipe = (meal,recipes,name,ingredients,instructions) =>{
 
    let meal_id = meal.id
    fetch(`${api_url}/recipes`, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json'
     },
     body: JSON.stringify({
         name,
         ingredients,
         instructions,
         meal_id
      })
    }).then(r => r.json())
    .then((recipe) => {
        showMeal(meal_id)
    }
    )
  
  
  }
  
  editRecipe = (recipeId,name,ingredients,instructions,meal_id,editRecipeDiv) =>{
  
     
  console.log("editRecipeDiv:",editRecipeDiv)
      fetch(`${api_url}/recipes/${recipeId}`, {
        method:'PATCH',
       headers: { 
           'Content-type': 'application/json'
       },
       body: JSON.stringify({
           name,
           ingredients,
           instructions,
           meal_id
        })
      })
      .then(r =>r.json())
      .then((recipe) => {
          console.log(recipe)
          while (editRecipeDiv.firstChild) {
              editRecipeDiv.removeChild(editRecipeDiv.firstChild);
            }
          
          showMeal(meal_id)
  
      }
      )
  }