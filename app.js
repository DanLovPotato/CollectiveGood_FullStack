// require module
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const mysql = require("mysql");
const display = require( './public/javaScript/display.js');
const path = require("path");
const cookieParser = require("cookie-parser");
const router = express.Router();
const { sample } = require("lodash");

const https = require("https"); // it's a native node module so we dont need to use npm install

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
//data comein as json files
app.use(express.json());
// for protecting sensetive inf
dotenv.config({path: "./.env"}); 

// define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
 
//connect to MySQL
const db = mysql.createConnection({
  // regular user and password from xampp
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL,
}); //open http://localhost/phpmyadmin
db.connect( function(err) {
  if(err){
      console.log(err);
  }else{
      console.log("succesfully connected to MySql");
  } 
});

//connect to mongodb
mongoose.connect("mongodb+srv://"+ process.env.MONGOCONNECT);

let caseList = []; // global variable

const caseSchema = new mongoose.Schema({
    
    _id: String,
    allergies: Array,
    advance_directives: String,
    care_plan: String,
    diagnostic_results: String,
    fxn_status: String,
    immunizations: Array,
    med_devices: Array,
    past_hist: Array,
    pregnancy: String,
    problem_list: Object,
    procedure_hist: Array,
    social_hist: Object,
    vitals: Object,
    patient_demo: Object,
    past_hist_desc: Object,
    preg_hist: Array,
    rx_desc: Object,
    rx_list: Array,
    source: String,
    vignette: String,
    phys_exam: String,
    comment: Array
});
    
const Case = mongoose.model("Case", caseSchema);

Case.find().exec().then((cases) => {
    cases.forEach((case_) => {
        caseList.push(case_);
    });
    
}).catch((error) => {
    console.error('Error retrieving cases:', error);
});






// case page
module.exports.caseList = caseList;


// success page
app.get("/success", function (req, res) {
    res.render("success"); 
});
  
// case Welcome page
app.get("/caseWel", function (req, res) {
  res.render("caseWel"); 
});
// case About page
app.get("/caseAbout", function (req, res) {
  res.render("caseAbout"); 
});


//case detail page
app.get("/caseDetail", function (req, res) {
  //chose random case
  var cases = [...caseList]; // Create a copy of the array
  globalThis.randomCases = [];
  globalThis.i = 1;
  globalThis.posti = 0;
  globalThis.numCases = 3;
  for (var i = 0; i < numCases; i++) {
    var randomIndex = Math.floor(Math.random() * cases.length);
    var selectedCase = cases[randomIndex];
    // Remove the selected case from the array
    cases.splice(randomIndex, 1);
    randomCases.push(selectedCase);
  }
  // case Detail page
  res.render("caseDetail",{ id : randomCases[0]._id }); 
});



//match url with caseID

app.get("/case/:id", function (req, res) {
    
  const urlID = req.params.id;
  caseList.forEach(function (case_) {
    const caseID = case_._id;
    if (urlID === caseID) {
      //console.log("match!");
      const tempCase = fs.readFileSync(`${__dirname}/views/case.html`, "utf-8");
      const output = display.replaceTemplate(tempCase, case_);
      res.send(output);
    }     

  });
  
  
});


  // Post comment data
  app.post("/case/:id", function (req, res) {
    const user = require("./controllers/auth.js");
    
    
    
    
    db.query("INSERT INTO comment SET ?",{
      userID: user.name.name, 
      caseID: randomCases[posti]._id, 
      comment: req.body.comment1, 
      confidence: req.body.confidence1});
      db.query("INSERT INTO comment SET ?",{
        userID: user.name.name, 
        caseID: randomCases[posti]._id, 
        comment: req.body.comment2, 
        confidence: req.body.confidence2});
        db.query("INSERT INTO comment SET ?",{
          userID: user.name.name, 
          caseID: randomCases[posti]._id, 
          comment: req.body.comment3, 
          confidence: req.body.confidence3});
          
        posti++;
        
      if(i < numCases){
        console.log(randomCases[i]._id);
          res.redirect("/case/"+randomCases[i]._id);
          i++;
      }else{
        res.redirect("/success");
      }
    
  })










app.listen(8080, function () {
    console.log("Server started on port 8080");
  });
  