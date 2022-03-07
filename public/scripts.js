
const recipes = document.querySelectorAll('.recipe-content');

for(let i =0; i < recipes.length; i++) {
    let recipe = recipes[i];
    console.log(recipe)
    recipe.addEventListener("click", function(){
        position = recipe.lastChild.previousSibling.value
        console.log(position)
        window.location.href = `/recipes/${position}/`
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




function paginate(selectedPage, totalPages){
    let pages = [],
        oldPage 

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        
        
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...')    
            }
            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }


    return pages
}


function createPagination(pagination){
    const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total)

let elements = ""
for (let page of pages){
    
    if(String(page).includes('...')){
        elements += `<span>${page}</span>`
    } else {
        
        elements += `<a href="?page=${page}">${page}</a>`
    }
}

pagination.innerHTML = elements


}



const pagination = document.querySelector('.pagination')

if(pagination){
    createPagination(pagination)
}


