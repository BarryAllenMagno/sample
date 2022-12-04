const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');
const bodyParser = require("body-parser");
const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000"
}));


MongoClient.connect("mongodb+srv://exebarry:fjfRH88vD8F7WhDw@cluster0.ar1bl.mongodb.net/?retryWrites=true&w=majority", 
function (error, client) {
    if (error) {
        console.log(error, "asdasdasdasd");
    }
    else {
        // connect to database...
        const db = client.db("to-do-list-database");
        const toDoListCollection = db.collection("to-do-list-collection");
        
        // returns all to-do list
        app.get("/", async function(request, response) {
            const toDoList = await toDoListCollection.find().toArray();
            console.log(toDoList);
            response.json(toDoList);
        });

        // returns a to-do by id
        app.get("/id", async function (request, response) {
            const id = request.query.id;
            const toDo = await toDoListCollection.findOne({_id: ObjectId(id)});
            response.json(toDo);
        });

        // adds new to-do
        app.post("/", async function (request, response) {
            const data = request.body;
            if (data.task === "" || data.date === "" || data.dueDate === "") {
                response.send("Please complete the data!")
            }
            else {
                const saveResult = await toDoListCollection.insertOne(data);
                response.json(saveResult);
            }
        }); 

        // update existing to-do
        app.put("/", async function (request, response) {
            const data = request.body;
            if (data._id === "" || data.task === "" || data.date === "" || data.dueDate === "") {
                response.send("Missing something!");
            }
            else {
                const saveResult = await toDoListCollection.findOneAndUpdate(
                    {_id: ObjectId(data._id)}, 
                        {
                            $set: {
                                task: data.task,
                                date: data.date,
                                dueDate: data.dueDate
                            }
                        }
                    );
                response.json(saveResult);
            }
        });

        // deletes a to-do by id
        app.delete("/", async function (request, response) {
            const data = request.body;
            const deleteResult = await toDoListCollection.deleteOne({ _id: ObjectId(data._id) });
            response.json(deleteResult);
        });

        app.listen(3001, function () {
            console.log('listening on port 3001');
        });
    }
});

