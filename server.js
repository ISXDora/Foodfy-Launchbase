const express = require('express');
const nunjucks = require('nunjucks');
const recipes = require('./data')
const server = express();
const port = 5000

server.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})

server.set('view engine', 'njk')

nunjucks.configure('views', {
    autoescape: true,
    express: server,
    noCache: true
});


server.use(express.static('public'));


server.get('/', (req,res) =>{
   return  res.render('index', { items: recipes })
})
server.get('/about', (req,res) =>{
    return  res.render('about')
 })
 server.get('/recipes', (req,res) =>{
    return  res.render('recipes', {items: recipes})
 })
 server.get('/recipes/:index', (req,res) =>{
    
    const indexRecipe = req.params.index
    const recipe = recipes
    console.log(recipe[indexRecipe.replace(":","")])

    return res.render("recipe", {items: recipe[indexRecipe.replace(":", "")]})
    
})