const db = require('../../../config/db')
const Recipe = require('../../models/admin/Recipe')

module.exports = {

    index(req,res){
        return res.render('admin/recipes/index')
    },
    create(req, res){
        return res.render("admin/recipes/create")
    },
    post(req, res){
    
    const keys = Object.keys(req.body)
    
    const [recipe_image,
            ingredients,
            preparations,    
    ] = keys
    
    if(req.body[recipe_image] == "" || req.body[ingredients] == "" || req.body[preparations] == "" ){
        return res.send("Os campos de imagem, ingredientes e modo de preparo são obrigatórios. Por favor, preencha os campos antes de salvar a receita.")
    }
     
    return res.redirect("/admin/recipes")
    },
    show(req, res){
    const {id} = req.params
    const foundRecipe = dataJson.recipes.find(function(recipe){
        return recipe.id == id
    })
    
    if(!foundRecipe){
        return res.send("Recipe not found")
    }
    
    const recipe = {
        ...foundRecipe,
    }
    
    return res.render("recipes/show", )
    },
    edit(req, res){
    const {id} = req.params
    
    const foundRecipe = dataJson.recipes.find(function(recipe){
        return recipe.id == id
    })
    
    if(!foundRecipe){
        return res.send("Recipe not found!")
    }
    
    const recipe = {
        ...foundRecipe,
    }
    
    return res.render("recipes/edit")
    },
    put(req, res) {
    const {id} = req.body

    let index = 0
    const foundRecipe = dataJson.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id){
            index = foundIndex
            return true
        }
    })
    if(!foundRecipe){
        return res.send("Recipe not found")
    }

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
        }

    dataJson.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(dataJson, null, 2),function(err){
        if(err) return res.send("Falha ao enviar dados!")
    })
       
    return res.redirect("/admin/recipes")
    },
    delete(req, res){
const {id} = req.body

const filteredRecipes = dataJson.recipes.filter(function(recipe){
    return recipe.id != id
})
dataJson.recipes = filteredRecipes;

fs.writeFile('data.json', JSON.stringify(dataJson, null, 2), function(err){
    if(err) return res.send("Write File error: " + err)

    return res.redirect("/admin/recipes")
})
    }
}

