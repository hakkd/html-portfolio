import bodyparser from "body-parser";
import express from "express";
import dirname from "path";

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get('/', function(req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items});
});

app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    if (req.body.listTitle !== "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function() {
    console.log("server running on port 3000");
});