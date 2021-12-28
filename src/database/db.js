//Import a sqlite3 dependencia 
const sqlite3 = require("sqlite3").verbose()

//Create a object that will make operations on database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//Using database object for our operations
db.serialize(() => {
//     //With command SQL will use:
//     //1 - Create a table for data
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // 2 - Put data for table
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1615388394555-a37ed827718f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
//         "Colectoria",
//         "Guilherme Gembella, Jardim Améririca",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do sul",
//         "Respiduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // 3 - See database on table
//     // db.all(`SELECT * FROM places`, function(err, rows){
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })

//     // 4- Delete a data in table
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })
})