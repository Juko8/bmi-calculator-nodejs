var express = require("express");

// create express app
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", (res) => {
    res.render("pages/landing");
});

app.get("/result", (req, res) => {
    var m = parseInt(req.query.cm, 10) / 100;
    var kg = req.query.kg;

    if(m == 0 || isNaN(m)){
        res.redirect("/");
    }else {
        var bmi = kg / (m * m);
        res.render("pages/result", {
            bmi
        });
    }
});

var port = 8080;
console.log("App is running on http://localhost:"+port)
app.listen(port);
