const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const routes = require('./routes')
const methodOverride = require('method-override')
const port = 5000

server.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})

server.set('view engine', 'njk')

nunjucks.configure('src/app/views/',{
    autoescape: false,
    express: server,
    noCache: true
});

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'));
server.use(methodOverride('_method'))
server.use(routes)
