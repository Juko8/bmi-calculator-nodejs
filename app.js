var express = require("express");

// create express app
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/landing");
});

app.get("/result", (req, res) => {
    const m = parseInt(req.query.cm, 10) / 100;
    const kg = req.query.kg;

    if (m == 0 || isNaN(m)){
        res.redirect("/");
    } else {
        const bmi = kg / (m * m);
        const bmiCategory = require('./bmiCategory');
        const bmiCategoryResult = bmiCategory(bmi);
        res.render("pages/result", {
            bmi,
            bmiCategoryResult
        });
    }
});

app.get("/ratioresult", (req, res) => {
    const waist = req.query.waist;
    const hip = req.query.hip;
    const gender = req.query.gender;
    console.log(req.url);

    if (hip == 0 || isNaN(hip)){
        res.redirect("/");
    } else {
        const ratio = waist/hip;
        const waistHipRatio = require('./waistHipRatio');
        const categoryResult = waistHipRatio(ratio, gender);
        res.render("pages/ratioresult", {
            ratio,
            categoryResult
        });
    }
});

var port = 8080;
console.log("App is running on http://localhost:"+port)
app.listen(port);
