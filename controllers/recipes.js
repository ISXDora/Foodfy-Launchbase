const fs = require('fs')
const dataJson = require('../data.json')


exports.index = function(req,res) {

    return res.render('recipes/index', {recipes: dataJson.recipes})
}

exports.create = function(req, res){
    return res.render("recipes/create")
}

exports.post = function(req, res){

    const keys = Object.keys(req.body)

    const [recipe_image,
            ingredients,
            preparations,    
    ] = keys

    if(req.body[recipe_image] == "" || req.body[ingredients] == "" || req.body[preparations] == "" ){
        return res.send("Os campos de imagem, ingredientes e modo de preparo são obrigatórios. Por favor, preencha os campos antes de salvar a receita.")
    }

    let id = 1

    const lastRecipe = dataJson.recipes[dataJson.recipes.length -1]

    if(lastRecipe){
        id = lastRecipe.id + 1
    }
    

    dataJson.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(dataJson, null, 2),function(err){
        if(err) return res.send("Falha ao enviar dados!")
    })
       
    return res.redirect("/admin/recipes")
}

exports.show = function(req, res){
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

    return res.render("recipes/show", {recipe})
}

exports.edit = function(req, res){
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

    return res.render("recipes/edit", {recipe})
}

exports.put = function(req, res) {
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
}

exports.delete = function (req, res){
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

