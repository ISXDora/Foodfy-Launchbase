const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/admin/recipes')
const chefs = require('./app/controllers/admin/chefs')


routes.get('/', (req,res) =>{
    return  res.render('website/index', { items: recipes })
 })
routes.get('/about', (req,res) =>{
     return  res.render('website/about')
  })
routes.get('/search', (req,res) =>{
   return  res.render('website/search', { items: recipes })
})
routes.get('/chefs', (req,res) =>{
   return  res.render('website/chefs', { items: recipes })
})
routes.get('/recipes', (req,res) =>{
     return  res.render('website/recipes', {items: recipes})
  })
routes.get('/recipes/:index', (req,res) =>{
     
     const indexRecipe = req.params.index
     const recipe =recipes
     console.log(recipe[indexRecipe.replace(":","")])
 
     return res.render("website/recipe", {items: recipe[indexRecipe.replace(":", "")]})
     
 }) 


 routes.get("/admin", (req, res) => {
    return res.redirect("/admin/recipes")
 })

 routes.get("/admin/recipes", recipes.index);
 routes.get("/admin/create", recipes.create); // Mostrar formulário de nova receita
 routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
 routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
 routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
 routes.put("/admin/recipes", recipes.put); // Editar uma receita
 routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
 


 routes.get("/admin/chefs", chefs.index);
 routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
 routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de uma receita
 routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita
 routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
 routes.put("/admin/chefs", chefs.put); // Editar uma receita
 //routes.delete("/admin/chefs", chefs.delete);

 module.exports = routes


