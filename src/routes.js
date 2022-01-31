const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/admin/recipes')
const chefs = require('./app/controllers/admin/chefs')
const data = require('./app/controllers/website/recipes')


routes.get('/', data.mostAccessed); //Página inicial do site - carrega receitas mais acessadas 
routes.get('/about', data.about); //Página organizacional do foodfy 
routes.get('/search', data.search)
routes.get('/chefs', data.indexChefs) // Mostra página com a listagem dos chefs
routes.get('/recipes', data.index) //Página carrega receitas
routes.get('/recipes/:id', data.show)
     


 routes.get("/admin", (req, res) => {
    return res.redirect("/admin/recipes")
 })

 routes.get("/admin/recipes", recipes.index);
 routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
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


