
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


// photos 
const PhotosUpload = {
    input: '',
    uploadLimit: 5,
    preview: document.querySelector('#photos-preview'),
    files: [],
    handleFileInputRecipes(event){
        const {files: fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return 
        
        Array.from(fileList).forEach((file)=>{

            PhotosUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const {uploadLimit, input, preview} = PhotosUpload
        const {files : fileList} = input

        if(fileList.length > uploadLimit){
            alert(`Envie no máximo ${this.uploadLimit} fotos`)
            event.preventDefault()
            return true
        }


        const photosDiv = []
        preview.childNodes.forEach(item=>{
            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert('Você atingiu o limite máximo de fotos!')
            event.preventDefault
            return true 
        }
       if(totalPhotos === 0 ){
            alert('Adicione ao menoa 1 foto!')
            event.preventDefault
            return true
       }
        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboarEvent("").clipboardData || new DataTransfer() //para funcionar no firefox

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const div = document.createElement('div')

        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    }, 
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'

        return button

    },
    removePhoto(event){
        const photoDiv = event.target.parentNode // <div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)


        PhotosUpload.files.splice(index, 1)
        photoDiv.remove()
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },
    removeOldPhoto(){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},` //1,2,3
            }
        }
        photoDiv.remove()
    }

   
}

const PhotoUploadChef = {

    handleFileInputChef(event){
        const {file} = event.target 


        if(file.length > 1){
            alert('Apenas 1 foto permitida!')
            event.preventDefault()
            return
        }    
    }

}