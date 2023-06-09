const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid")
const app = express()

// function that will check to see if notes exist; and if they do, display
const getNotes = function () {
    const noteData = fs.readFileSync("./db/db.json", "utf8");
    const notes = JSON.parse(noteData);

    return notes;
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }))

// route to notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// route to/from the db.json for the note info through getNotes function on line 9
app.get('/api/notes', (req, res) => {

    const notes = getNotes();
    res.json(notes);

    console.log(`${req.method} Routing to Note Storage`)
    }
    );

// creating a new note on the body form as an object; then pushing it (line 52) to the existing array from db.json
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} Request Received to Add a Note`);
    const { title, text} = req.body;
    let saveNote;
    if (title && text) {
        saveNote = {
            title,
            text,
            id: uuidv4()
        }
    };
// then pushing it (line 53) to the existing array from db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            notes.push(saveNote);

// then update the db.json with new notes array
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 3),
            (err) =>
            err
            ?console.error(err)
            :console.log('This worked.')
        );
        }
    }
    );
    res.redirect("/");
    }
)
app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received to DELETE NOTE!!!`);
    const noteIDFind = req.params.id;
    // find this note on the array by the id parameter in db.json and  then remove it
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const Note = JSON.parse(data);
            for (let x = 0; x < Note.length; x++) {
                if(noteIDFind === Note[x].id) {
                    Note.splice(x, 1)
                }
            }
            console.log(Note)
        // then rewrite the new db.json file without it   
            fs.writeFile('./db/db.json', JSON.stringify(Note, null, 3),
                (err) =>
                err
                ?console.error(err)
                :console.log('This worked.')
            );
        }
});
    res.redirect("/");
    }
);
// ROOT ROUTE '*' = wildcard route to index.html file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`)
);