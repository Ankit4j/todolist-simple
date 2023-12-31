const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const items = ["buy tickets", "go to cinemas", "watch movie"];
const workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    let day = date.getDate();
    
    res.render("list", {listTitle: day, itemList: items});
})

app.post("/", function(req, res) {

    const item = req.body.item;

    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
    
        res.redirect("/");
    }
  
}) 

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", itemList: workItems})
})

app.post("/work", function(req, res) {
    const item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
})



app.listen(3000, function() {
    console.log("server is running at port 3000");
})