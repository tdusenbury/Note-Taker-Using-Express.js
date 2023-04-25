const express = require("express");
const fs = require("fs");
const path = require("path");
const noteStorage = require("./db/db.json")

// const noteID = (CREATE UNIQUE ID FOR NOTES---is this a require or defined?)

const app = express()
//const PORT = (THIS IS WHERE HEROKU WILL BE REFERENCED & called at end of this page)

app.use(express.static('public'));

//send notes to public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/', (req, res) => {
    res.json({

    })
})






// app.listen(PORT, () =>
// console.log(`Listening to ${PORT}!`)
// );