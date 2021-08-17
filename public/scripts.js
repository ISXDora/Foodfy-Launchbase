const modalOverlay = document.querySelector('.modal-overlay');
const recipes = document.querySelectorAll('.recipe-content');
const modal = document.querySelector('.modal');
const itemMenu = document.querySelector('.menu');
const item = itemMenu.querySelector('a');

/*for (let recipe of recipes){
    recipe.addEventListener("click", function(){
        const imgId = recipe.getAttribute("id");
        const tituloModal = recipe.querySelector("h3").textContent;
        const autorModal = recipe.querySelector('p').textContent;
        modalOverlay.classList.add('active');
        modalOverlay.querySelector('img').src =`/assets/${imgId}`
        modalOverlay.querySelector('h3').textContent = `${tituloModal}`
        modalOverlay.querySelector('p').textContent = `${autorModal}`

    })
}*/


/*document.querySelector('.close-modal').addEventListener("click", function(){
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('img').src =""
})*/







