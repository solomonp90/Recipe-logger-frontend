let mainDiv = document.getElementById('main')
const navigation = document.getElementById('navigation')
let mealsDiv = document.getElementById('meals-div')
const mealDiv = document.getElementById('meal-div')

// open navigation menu
openNav = () => {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
  }



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
        console.log(mealForm)

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
    }
    )

        }
        )
    }
  }
  )


home = () =>{

fetch('http://localhost:3000/meals')
.then(r => r.json())
.then((mealsArr) => {
  console.log(mealsArr)
  mealsArr.forEach((meal)=>{

    mealsDiv.innerHTML += `<div class="col-6" >
      <h1 >${meal.name}</h1>
      <div class="row" >
      <img src="${meal.image}" height="200px" width="200px" class="col-3" >
      
      <p  class="col-9">${meal.kind}</p>
      
      <a  href="#meals/${meal.id}" data-id="${meal.id}" id="more-info">see more</a>
      
      </div>
    </div>`
  })
}
)

  }

home()



mealsDiv.addEventListener('click',(evt) => {
  console.log("evt",evt)
 
  let id = evt.target.dataset.id
  let target = evt.target.id
  
    if(target==="more-info"){
      fetch(`http://localhost:3000/meals/${id}`)
      .then(r => r.json())
      .then((meal)=>{
        console.log(meal)
        mainDiv.innerHTML = `<div class="col-12">
          <h1>${meal.name}</h1>
          <img src="${meal.image}" height="300px" width="300px"/>
          <p>${meal.description}</p>
        </div>`
      })
    }



})


  