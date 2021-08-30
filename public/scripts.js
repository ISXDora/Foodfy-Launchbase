
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

const handleTogle = document.querySelectorAll('.togle-button');

for(let position of handleTogle){
    position.addEventListener("click", function(){
        if (position.value === 'ESCONDER'){
            position.value = 'MOSTRAR'
        }else {
            position.value = 'ESCONDER'
        }
        position.parentElement.nextElementSibling.classList.toggle('active')
    })
}








        

        


