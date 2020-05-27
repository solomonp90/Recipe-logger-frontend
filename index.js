// const mainDiv = document.getElementById('main')
const mainDiv = document.getElementById('w3-main')
const mealsDiv = document.getElementById('meals')


// open navigation menu
openNav = () => {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
  }

  home = () =>{
    // for recreating style =====
    // let mealsDiv = document.createElement('div')
    // mealsDiv.id = "meals-div"
    // ===========


    console.log(mealsDiv)
    fetch('http://localhost:3000/meals')
    .then(r => r.json())
    .then((mealsArr) => {
      console.log(mealsArr)
      mealsArr.forEach((meal)=>{
    
        mealsDiv.innerHTML +=

        //  `<div class="col-6 food-item" >

        
        //   <h1 >${meal.name}</h1>
          
        //   <img src="${meal.image}" class="img-width" >
          
        //   <p  class="col-9">${meal.kind}</p>
          
        //   <a  href="#meals/${meal.id}" data-id="${meal.id}" id="more-info">see more</a>
          
          
        // </div>`

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
        console.log("evt",evt.target.id)
       
        let id = evt.target.dataset.id
        let target = evt.target.id
        
          if(target==="more-info"){
            fetch(`http://localhost:3000/meals/${id}`)
            .then(r => r.json())
            .then((meal)=>{
              console.log(meal)
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
        mainDiv.innerHTML += `<li data-id="${meal.id}" data-id="${recipe.id}"> ${recipe.ingredients} - <i>${recipe.name}, ${recipe.content} </i></li>`
      })
      
      mainDiv.innerHTML += `
      <br>
      <br>
      </ul></p>
      <div class="container" id="form-container">
        <form data-id="${meal.id}" id="new-recipe"><h3>Tell us how you feel! 💭 </h3>
            <div class="form-group">
              <textarea class="form-control" name="recipe" id="recipe-content" rows="3"></textarea>
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

            })
          }
    
      })

      
      













      navigation.addEventListener('click',(evt) => {
    
    
        let input = evt.target.id
        if(input==="addMeal"){
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
          <button type="submit" name="submit" value="Create a new meal">Add Meal</button>
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
          
      
        //   let mainDiv = document.getElementById("main");
      while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
      }
      home()
      
        }
        )
      
            }
            )
        }
      }
      )