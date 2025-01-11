const express = require("express");
const port = 3000;
const path = require("path");
const Listing = require("C:/Users/karth/Desktop/To Do BE/models/listing.js");
const mongoose = require("mongoose");
const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongo_url = 'mongodb://127.0.0.1:27017/TaskManagement';


main()
.then(()=>{
    console.log("connected!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}


app.get("/home",(req,res)=>{
    Listing.find()
        .then((tasks) => {
            res.render("home", { tasks });
        })
        .catch((err) => console.log(err));
});

app.get("/addTask", (req, res) => {
    res.render("addTask");
});

app.post("/addTask", (req, res) => {
    const { category, task } = req.body;
    const newTask = new Listing({
        category,
        task,
    });

    newTask.save()
        .then(() => res.redirect("/home"))
        .catch((err) => console.log(err));
});

app.get("/markCompleted/:id", (req, res) => {
    Listing.findByIdAndUpdate(req.params.id, { completed: true })
        .then(() => res.redirect("/home"))
        .catch((err) => console.log(err));
});

app.get("/editTask/:id", (req, res) => {
    Listing.findById(req.params.id)
        .then((task) => {
            res.render("edit", { task });
        })
        .catch((err) => console.log(err));
});

app.post("/editTask/:id", (req, res) => {
    const { category, task } = req.body;
    Listing.findByIdAndUpdate(req.params.id, { category, task })
        .then(() => res.redirect("/home"))
        .catch((err) => console.log(err));
});

app.get("/deleteTask/:id", (req, res) => {
    Listing.findByIdAndDelete(req.params.id)
        .then(() => res.redirect("/home"))
        .catch((err) => console.log(err));
});



app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});