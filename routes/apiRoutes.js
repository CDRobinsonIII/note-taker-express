const fs = require("fs");
const notesDatabase = require("../db/db.json");


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
        fs.writeFile("./db/db.json", JSON.stringify(notesDatabase), function (error) {
            if (error) 
                throw error;
        })
        res.json(notesDatabase)
    });

    // DELETE route to save notes to db.json
    app.delete("/api/notes/:id", function (req, res) {
        const id = req.params.id;
    });
}