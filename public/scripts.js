
const recipes = document.querySelectorAll('.recipe-content');
console.log(recipes)

for (let i = 0; i < recipes.length; ++i){
    let recipe = recipes[i];
    recipe.addEventListener("click", function(){
       const position = [i]
        console.log(position)

        window.location.href= `/recipes/:${position}`
    })
}

    
        

        


