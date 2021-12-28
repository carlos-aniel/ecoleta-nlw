// I'm Carlos aniel, I put these comments in English for my future when I see the parts of this code to understand how code works and start you learning English in practice. PS: I know I'm spelling it wrong and it's not natural to write in English, please correct it.

//File server.js project server configuration with express

const express = require("express")
const server = express()
//Turn on the server
server.listen(3001)

//Take the database
const db = require("./database/db")

//Calling the project folders that are in public
server.use(express.static("public"))

// Enable the use aplication req.body
server.use(express.urlencoded({ extended: true }))

//Using template engine with nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//Configuration of pages

//Configured initial page
//server.get("/") = A como vai ser mostrado esse caminho na url
server.get("/", (req, res) => { //req = Requisição - res = Resposta
    return res.render("index.html",{title:"Ado ado ado teste"})
})

//Configured the collection point page
server.get("/create-point", (req, res) => { //req = Requisição - res = Resposta
    console.log(req.query)

    return res.render("create-point.html")
})

//Hiding URL data with http
//Connected to form action
server.post("/savepoint", (req, res) => {

    // console.log(req.body)

    //2 - Put data for table
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData )

    
})

//Configured collection point search results page
server.get("/search", (req, res) => { //req = Requisição - res = Resposta

    const search = req.query.search

    //empty search
    if(search == "") {
        return res.render("search-results.html", {total: 0})
    }

    //Take the database data
    //3 - See database on table
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }
        
        const total = rows.length

        //Show the html page with the data from the database
        return res.render("search-results.html", {places: rows, total: total})
        console.log(rows)
    })
})