const express = require('express')
const routes = express.Router()
const recipesData = require('./data.js')
const recipes = require('./controllers/recipes')





routes.get('/', (req,res) =>{
    return  res.render('website/index', { items: recipesData })
 })
routes.get('/about', (req,res) =>{
     return  res.render('website/about')
  })
routes.get('/recipes', (req,res) =>{
     return  res.render('website/recipes', {items: recipesData})
  })
routes.get('/recipes/:index', (req,res) =>{
     
     const indexRecipe = req.params.index
     const recipe = recipesData
     console.log(recipe[indexRecipe.replace(":","")])
 
     return res.render("website/recipe", {items: recipe[indexRecipe.replace(":", "")]})
     
 }) 


 routes.get("/admin", (req, res) => {
    return res.redirect("/admin/recipes")
 })

 routes.get("/admin/recipes", recipes.index);

 routes.get("/admin/create", recipes.create); // Mostrar formulário de nova receita
//routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
//routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

//routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
//routes.put("/admin/recipes", recipes.put); // Editar uma receita
//routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
 


 module.exports = routes


