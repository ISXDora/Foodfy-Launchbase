const data = require('../data.js')
const fs = require('fs')
const dataJson = require('../data.json')


exports.index = function(req,res) {
    const dataProvisorio = data

    return res.render('recipes/index', {dadosTeste: data})
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

    if(req.body[recipe_image] == "" || req.body[ingredients] == "" || req.body[preparationc] == "" ){
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


