const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const caseList = require("../app.js")

// register page
router.get("/register", (req, res) => {
    res.render("register",{ message: ""});
});

router.get("/login", (req, res) => {
    res.render("login",{ message: ""});
});

router.get("/", authController.isLoggedIn, (req, res) => {
    
    if(req.user){
        res.render("profile",{
            user: req.user
        });

    }else{
        res.redirect('/login');
    }
   
});


router.get("/caseDisplay", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        // Get random cases
        var cases = [...caseList.caseList]; // Create a copy of the array
        var randomCases = [];
        var numCases = 3;
        for (var i = 0; i < numCases; i++) {
          var randomIndex = Math.floor(Math.random() * cases.length);
          var selectedCase = cases[randomIndex];
    
          // Remove the selected case from the array
          cases.splice(randomIndex, 1);
    
          randomCases.push(selectedCase);
        }
    
        res.render("caseDisplay", { cases: randomCases });
      } else {
        res.redirect('/login');
      }
   
});

router.get("/case", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        // Get random cases
        var cases = [...caseList.caseList]; // Create a copy of the array
        var randomCases = [];
        var numCases = 3;
        for (var i = 0; i < numCases; i++) {
          var randomIndex = Math.floor(Math.random() * cases.length);
          var selectedCase = cases[randomIndex];
    
          // Remove the selected case from the array
          cases.splice(randomIndex, 1);
    
          randomCases.push(selectedCase);
        }
    
        res.render("caseDisplay", { cases: randomCases });
      } else {
        res.redirect('/login');
      }
   
});


module.exports = router;