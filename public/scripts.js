
//const recipes = document.querySelectorAll('.recipe-content');
//console.log(recipes)

//for (let i = 0; i < recipes.length; ++i){
    //let recipe = recipes[i];
    //recipe.addEventListener("click", function(){
      // const position = [i] 
        //console.log(position)

        //window.location.href= `/recipes/:${position}`
    //})
//}

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


const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .menu a")

for (item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("bold")
        console.log(currentPage)
        console.log(item)
    }
}


const redirectPage = document.querySelector("header .logo img")
redirectPage.addEventListener("click", function(){
    
    window.location.href= `/`
})







        

        


