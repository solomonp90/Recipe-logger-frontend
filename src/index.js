const api_url = `https://recipe-logger.herokuapp.com/`
const mainDiv = document.getElementById('w3-main')
let navigation = document.getElementById('navigation')
let editDiv = document.getElementById('edit-meal-form')
let deleteDiv = document.getElementById('delete-meal-form')
let mealsDiv = document.getElementById('meals')


// open navigation menu
openNav = () => {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
  }


  home = () =>{

    let mealsDiv = document.getElementById('meals')

    fetch(`${api_url}/meals`)
    .then(r => r.json())
    .then((mealsArr) => {
      console.log(mealsArr)
      mealsArr.forEach((meal)=>{

    mealsDiv.innerHTML +=
    `<div class="w3-quarter" style="height: 400px">
    <img src="${meal.image}" alt="${meal.name}" style="width:100% ;height:50%">
    <h3>${meal.name}</h3>
    <p>${meal.kind}.</p>
    <a  href="#meals/${meal.id}" data-id="${meal.id}" id="more-info">see more</a>
    </div>`      
      })
    })}
    
    home()

    mainDiv.addEventListener('click',(evt) => {
        let id = evt.target.dataset.id
        let target = evt.target.id    
        if(target==="more-info"){ showMeal(id) }
      })

     navigationHandler = ()=>{
       navigation.addEventListener('click',(evt) => {
         let input = evt.target.id    

           switch(input){
            case "addMeal" :
              addMealHtml();
              deleteDiv.className = "hide"
              editDiv.className = "hide"
              break;
              case "editMeal":
                openNav()
                deleteDiv.className ="hide"
                editDiv.className = "show"
                break;
                case "deleteMeal":
                  openNav()
                  editDiv.className = "hide"
                  deleteDiv.className = "show w3-padding-32 w3-center"
                  confirmDelete()
                  break;
           }
       })
     }
     
    navigationHandler()


    addMealHtml = () => {
      mainDiv.innerHTML = `<div class="col-12">
      <form class=""  id="add-meal-form">
      <h3>Add a new Meal</h3>
      <label>Whats the name of this dish?</label>
      <input type="text" name="name" value="" placeholder="Enter a meal name" class="input-text">
      <br>
      <label>Add a photo URL</label>       
      <input type="text" name="image" value="" placeholder="Enter a meal's image URL" class="input-text">
      <br>
      <label>What kind of meal is this?</label>
      <input type="text" name="kind" value="" placeholder="Enter the kind of meal" class="input-text">
      <br>
      <label>How would you describe it?</label>
      <input type="textarea" name="description" value="" placeholder="Enter a meal description" class="input-text">
      <br>
      <button type="submit" name="submit" value="Create a new meal">Add Meal📥</button>
    </form>
        </div>`
  
        openNav()
  
        let mealForm = mainDiv.querySelector('form')
  
        mealForm.addEventListener('submit',(evt) => {
          evt.preventDefault()
          let nameInput = evt.target["name"].value
    let imageInput = evt.target["image"].value
    let kindInput = evt.target["kind"].value
    let descInput = evt.target["description"].value
      
          fetch(`${api_url}/meals`, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json'
     },
     body: JSON.stringify({
         name :nameInput,
         image:imageInput,
         kind:kindInput,
         description:descInput         
      })
    })
    .then(res => res.json())
    .then((meal) => {
      console.log(meal)
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }
  showMeal(meal.id)
    }) 
        })}

    editMeal = (meal)=>{

      let id = meal.id
      editDiv.addEventListener('submit',(evt) => {
        evt.preventDefault()
        let nameInput = evt.target["name"].value ? evt.target["name"].value : meal.name
        let imageInput = evt.target["image"].value ? evt.target["image"].value : meal.image
        let kindInput = evt.target["kind"].value ? evt.target["kind"].value : meal.kind
        let descInput = evt.target["description"].value ? evt.target["description"].value : meal.description
          
              fetch(`${api_url}/meals/${id}`, {
          method:'PATCH',
         headers: { 
             'Content-type': 'application/json'
         },
         body: JSON.stringify({
             name :nameInput,
             image:imageInput,
             kind:kindInput,
             description:descInput,
             meal_id:id           
          })
        })
        .then(res => res.json())
        .then((meal) => {
          editDiv.className = "hide"
          showMeal(meal.id)
        })     
      })}

    deleteMeal = () =>{
      let id = JSON.parse(localStorage.getItem('meal')).id;
      deleteDiv.className = "hide"
      console.log("from deleteMeal!!!",id)
      fetch(`${api_url}/meals/${id}`,{
                               method: "DELETE"
                             })
    }

    deleteRecipe = (recipeId) =>{
      let id = JSON.parse(localStorage.getItem('meal')).id;
      console.log("from deleteMeal!!!",id)
      fetch(`${api_url}/recipes/${recipeId}`,{
                               method: "DELETE"
                             }) 
    }

    confirmDelete = () =>{
      deleteDiv.addEventListener('click',(evt) => {
        console.log(evt.target.id)
        let input = evt.target.id
        
        switch(input){
          case "yes-button":
            deleteMeal();
            break;
            case "no-button":
              console.log("from confirm delete")
              break;
        }}
      )}

      showMeal = (id) => {
       
      fetch(`${api_url}/meals/${id}`)
      .then(r => r.json())
      .then((meal)=>{

        navigation.innerHTML = ` <div class="topnav " id="myTopnav">
        <a href="/" class="active" id="home">Home</a>
        <a href="#addMeal" id="addMeal">Add Meal</a>
        <a href="#editMeal" id="editMeal">Edit Meal</a>
        <a href="#delete" id="deleteMeal">Delete</a>
        <a href="javascript:void(0);" 
        class="icon" onclick={openNav()}>
        <i class="fa fa-bars"></i>
        </a>
    </div>`

        mainDiv.innerHTML = `<div class="w3-container w3-padding-32 w3-center">  
 <h2 style="text-align:center">${meal.name}</h2>
<img src="${meal.image}"  align="middle" width="700" height="600">
<div class="w3-padding-32 info">
  <h6><i>${meal.kind}</i></h6>
  <p>${meal.description}.</p>
</div>
 <h2> Recipes 📝 </h2>

 <ul id="recipes">
`

let recipesUl = document.getElementById('recipes')
console.log(recipesUl)

meal.recipes.forEach(recipe => {
  recipesUl.innerHTML += `<div class="col-12">

  <li data-id="${recipe.id}" >  
   <b>Ingredients:</b>
   <br> ${recipe.ingredients} - <i>${recipe.name}</i>
   <p>
   <b>Instructions:</b><br>
   ${recipe.instructions}</p>
    <button id="edit-recipe-button ${recipe.id}" data-id="${recipe.id}" class="show">Edit</button>
   </li>
   <div id="edit-recipe-div ${recipe.id}" class="hide">

   </div>

  </div>`

  
})

mainDiv.addEventListener('click',(evt) => {
  let recipeId = evt.target.dataset.id
  let input = evt.target.id
  let editRecipeButton = document.getElementById(`edit-recipe-button ${recipeId}`)
  let editRecipeDiv = document.getElementById(`edit-recipe-div ${recipeId}`)
 
  console.log("evt.target.dataset.id/recipeID:",recipeId,"evt.target.id/input:",input)
  console.log("editrecipeButton:",editRecipeButton)
  if(input === `edit-recipe-button ${recipeId}` && editRecipeDiv.children.length === 0){
    editRecipeDiv.className = "show"
    editRecipeButton.className = "hide"
 
    let editRecipeForm = document.createElement('form')
    editRecipeForm.className = `edit-recipe-form ${recipeId}`
    editRecipeForm.innerHTML = ` <div class="form-group">
    <label for="ingredients">Ingredients🌽</label>
    <textarea class="form-control" name="ingredients" id="recipe-ingredients" rows=2></textarea>
  <div class="form-group">
    <label for="instructions">Instructions📝</label>
    <textarea class="form-control" name="instructions" id="recipe-instructions" rows="2"></textarea>
  <div class="form-group">
    <label for="name">Name 📛</label>
    <input type="text" class="form-control" name="name">
  </div><br>
  
<button  id="post-button ${recipeId}">Post! 💌</button>
<a href="file:///Users/solomonpena/Documents/recipe-logger-frontend/index.html" id="delete-button ${recipeId}" onclick={deleteRecipe(${recipeId})}>
<button>Delete!!</button>
</a>

</div>`

editRecipeDiv.append(editRecipeForm)

    editRecipeForm.addEventListener('submit',(evt) => {
      evt.preventDefault()
       console.log("inside evt listner:",evt.target)

      let nameInput = evt.target["name"].value ? evt.target["name"].value : recipe.name
      let ingredientsInput = evt.target["ingredients"].value ? evt.target["ingredients"].value : recipe.ingredients
      let instructionsInput = evt.target["instructions"].value ? evt.target["instructions"].value : recipe.instructions

    editRecipe(recipeId,nameInput,ingredientsInput,instructionsInput,meal.id,editRecipeDiv)
    })
    }})

mainDiv.innerHTML += `
<br>
<br>
</ul>
<div class="container" id="form-container">
<form data-id="${meal.id}" id="new-recipe"><h3>Leave a recipe! 📝 </h3>
<div class="form-group">
<label for="ingredients">Ingredients🌽</label>
<textarea class="form-control" name="ingredients" id="recipe-ingredients" rows=2></textarea>
<div class="form-group">
<label for="instructions">Instructions📝</label>
<textarea class="form-control" name="instructions" id="recipe-instructions" rows="2"></textarea>
<div class="form-group">
<label for="name">Name 📛</label>
<input type="text" class="form-control" name="name">
</div><br>

<button type="submit" id="post-button">Post! 💌</button>
</div>
</form>
</div>
`
let newRecipeForm = mainDiv.querySelector('#new-recipe')

newRecipeForm.addEventListener('submit',(evt) => {
  evt.preventDefault()
  
  let nameInput = evt.target["name"].value
  let ingredientsInput = evt.target["ingredients"].value
  let instructionsInput = evt.target["instructions"].value

  newRecipe(meal,meal.recipes,nameInput,ingredientsInput,instructionsInput)
})





localStorage.setItem('meal', JSON.stringify(meal));


editMeal(meal)
      })
    }