const fs = require("fs");
const notesDatabase = require("../db/db.json");
// const path = require("path");
// const util = require("util");
// const readAsync = util.promisify(fs.readFile);
// const writeAsync = util.promisify(fs.writeFile);

// const getNotes = () => {
//     return readAsync(path.join(__dirname,"..//db/db.json"), "utf8").then((notes) => {
//         return JSON.parse(notes);
//     })
// }

module.exports = function(app) {

    // GET route to get notes from db.json
    app.get("/api/notes", function (req, res) {
        res.json(notesDatabase);
    });

    // POST route to save notes to db.json
    app.post("/api/notes", function (req, res) {
        const newObject = req.body;
        newObject.id = notesDatabase[notesDatabase.length-1].id+1;
        notesDatabase.push(req.body);
        fs.writeFile("../db/db.json", JSON.stringify(notesDatabase), function (error) {
            if (error) 
                throw error;
        })
        res.json(notesDatabase)
    });

    // DELETE route to save notes to db.json
    app.delete("/api/notes/:id", function (req, res) {
        const id = req.params.id;
        console.log("Hello they hit delete");
        console.log(id);
        console.log("Can I read the notesDAtabase without reading it? " + notesDatabase.id);
        fs.readFile(".//db/db.json", 'utf8', function(error, notes){ 
            if (error) 
            throw error;
            // Display the file content 
            console.log("Here are the notes: " + notes); 
            // return notes;
        }); 
        console.log("Here are the notes outside of the read function: " + parse.JSON(notes)); 

        const notesFilteredDatabase = notes.filter(u=> {u.id != notes.id});
        fs.writeFile(path.join(".//db/db.json"), JSON.stringify(notesFilteredDatabase), function (error) {
            if (error) 
                throw error;
        })

        res.json(notesFilteredDatabase);

        })

        // for (var i=0; i < notesDatabase.length; i++) {
        //     console.log("This is the id in the notesDatabase: "+notesDatabase[i].id);
        //     if (JSON.stringify(notesDatabase[i].id) === id) {
        //         console.log("This is the id to be deleted: " + id);
        //         notesDatabase.splice(id, 1);
        //         console.log("Array after delete: "+notesDatabase[1].id);
        //     }
        // }
}