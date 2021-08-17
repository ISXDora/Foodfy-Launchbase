const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const port = 5000

server.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})

server.set('view engine', 'html')

nunjucks.configure('views', {
    autoescape: true,
    express: server
});


server.use(express.static('public'));


server.get('/', (req,res) =>{
   return  res.render('index')
})
server.get('/about.html', (req,res) =>{
    return  res.render('about')
 })
 server.get('/recipes.html', (req,res) =>{
    return  res.render('recipes')
 })