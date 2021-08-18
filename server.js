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
    express: server
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


 /* server.get("/courses/:id", function(req, res) {
    const id = req.params.id;
    const post = posts.find(function(post){
        console.log(post, id)
         if(post.id == id){
            return true
        }
        if(!post) {
            return res.send("Post not found")
        }
    })

    return res.render("post", {post})
}) */


 server.get("/recipes/:index", function (req, res) {
    const recipe = [ require("./data.js")
        
    ]; // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index;
  
    console.log(recipes[recipeIndex]);
  })