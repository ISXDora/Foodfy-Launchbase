const express = require('express')
const routes = express.Router()
const recipes = require('./data.js')
const admin = require('./controllers/admin')





routes.get('/', (req,res) =>{
    return  res.render('website/index', { items: recipes })
 })
routes.get('/about', (req,res) =>{
     return  res.render('website/about')
  })
routes.get('/recipes', (req,res) =>{
     return  res.render('website/recipes', {items: recipes})
  })
routes.get('/recipes/:index', (req,res) =>{
     
     const indexRecipe = req.params.index
     const recipe = recipes
     console.log(recipe[indexRecipe.replace(":","")])
 
     return res.render("website/recipe", {items: recipe[indexRecipe.replace(":", "")]})
     
 }) 


 routes.get("/admin/recipes", admin.index);

//routes.get("/admin//create", recipes.create); // Mostrar formulário de nova receita
//routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
//routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

//routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
//routes.put("/admin/recipes", recipes.put); // Editar uma receita
//routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
 


 module.exports = routes


