const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const routes = require('./routes')
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

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'));
server.use(routes)
