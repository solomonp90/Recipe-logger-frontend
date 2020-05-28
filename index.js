// const mainDiv = document.getElementById('main')
const mainDiv = document.getElementById('w3-main')
// let mealsDiv = document.getElementById('meals')
let navigation = document.getElementById('navigation')

let editDiv = document.getElementById('edit-meal-form')
let deleteDiv = document.getElementById('delete-meal-form')
// const mealsDiv = document.querySelector('#meals')
let mealsDiv = document.getElementById('meals')


// open navigation menu
openNav = () => {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
  }


  home = () =>{

    let mealsDiv = document.getElementById('meals')

    fetch('http://localhost:3000/meals')
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

        // <button data-id="${meal.id}" id="more-info">see more</button>
       
      })
      // mainDiv.append(mealsDiv)
    }
    )
    
      }
    
    home()


    mainDiv.addEventListener('click',(evt) => {
 
        let id = evt.target.dataset.id
        let target = evt.target.id
        
        if(target==="more-info"){ showMeal(id) }

      })

 
     navigationHandler = ()=>{
       navigation.addEventListener('click',(evt) => {
         let input = evt.target.id    
          //  if(input==="addMeal"){ addMealHtml();}
          //  if(input==="editMeal"){console.log("woo") }

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
          // console.log("target:",evt.target)
          let nameInput = evt.target["name"].value
    let imageInput = evt.target["image"].value
    let kindInput = evt.target["kind"].value
    let descInput = evt.target["description"].value
      
          fetch(`http://localhost:3000/meals`, {
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

    }
    )
  
        }
        )
    
    }

    editMeal = (meal)=>{

      let id = meal.id
      editDiv.addEventListener('submit',(evt) => {
        evt.preventDefault()
        let nameInput = evt.target["name"].value ? evt.target["name"].value : meal.name
        let imageInput = evt.target["image"].value ? evt.target["image"].value : meal.image
        let kindInput = evt.target["kind"].value ? evt.target["kind"].value : meal.kind
        let descInput = evt.target["description"].value ? evt.target["description"].value : meal.description
          
              fetch(`http://localhost:3000/meals/${id}`, {
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
        }
        )
      

      }
      )

    }


    deleteMeal = () =>{
      let id = JSON.parse(localStorage.getItem('meal')).id;
      deleteDiv.className = "hide"
      console.log("from deleteMeal!!!",id)
      fetch(`http://localhost:3000/meals/${id}`,{
                               method: "DELETE"
                             })
    // while (mainDiv.firstChild) {
    //   mainDiv.removeChild(mainDiv.firstChild);
    // }
    // let mealsDiv = document.createElement('div')
    // mealsDiv.className = "w3-row-padding w3-padding-16 w3-center"
    // mealsDiv.id = "meals"
    // mainDiv.append(mealsDiv)
    
    // console.log(document)
    // home()
    
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
        }
       
      }
      )
    }







      showMeal = (id) => {
       
      fetch(`http://localhost:3000/meals/${id}`)
      .then(r => r.json())
      .then((meal)=>{
        // console.log(meal)
        
        navigation.innerHTML = ` <div class="topnav " id="myTopnav">
        <a href="file:///Users/solomonpena/Documents/recipe-logger-frontend/index.html" class="active" id="home">Home</a>
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
<p> <ul id="recipes">
`
meal.recipes.forEach(recipe => {
  mainDiv.innerHTML += `<li data-id="${meal.id}" data-id="${recipe.id}"> <b>Ingredients:</b><br> ${recipe.ingredients} - <i>${recipe.name}</i><p><b>Instructions:</b><br>${recipe.instructions}</p></li>`
})

mainDiv.innerHTML += `
<br>
<br>
</ul></p>
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
      <div class="form-group">
        <label for="location">Location📍</label>
        <input type="text" class="form-control" name="location">
      </div><br>
    <button type="submit" id="post-button">Post! 💌</button>
    </div>
    </form>
</div>
`

localStorage.setItem('meal', JSON.stringify(meal));


editMeal(meal)
      })
    }


    // let skater1 = JSON.parse(localStorage.getItem('skater'));
    