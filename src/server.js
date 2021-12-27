// I'm Carlos aniel, I put these comments in English for my future when I see the parts of this code to understand how code works and start you learning English in practice. PS: I know I'm spelling it wrong and it's not natural to write in English, please correct it.

//File server.js project server configuration with express

const express = require("express")
const server = express()
//Turn on the server
server.listen(3001)

//Calling the project folders that are in public
server.use(express.static("public"))

//Using template engine with nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//Configured initial page
//server.get("/") = A como vai ser mostrado esse caminho na url
server.get("/", (req, res) => { //req = Requisição - res = Resposta
    return res.render("index.html",{title:"Ado ado ado teste"})
})

//Configured the collection point page
server.get("/create-point", (req, res) => { //req = Requisição - res = Resposta
    return res.render("create-point.html")
})

//Configured collection point search results page
server.get("/search", (req, res) => { //req = Requisição - res = Resposta
    return res.render("search-results.html")
})