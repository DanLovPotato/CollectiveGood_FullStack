const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");

const mysql = require("mysql");

// MySQL
const db = mysql.createConnection({
    // regular user and password from xampp
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL,
  }); //open http://localhost/phpmyadmin

  
//register
exports.register = (req,res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const passwordConfirm = req.body.passwordConfirm;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render("register",{
                message: 'that email is already in use'
            });
        }else if( password !== passwordConfirm){
            return res.render("register",{
                message: 'Passwords do not match'
            });
        }
        
        let hashedPassword = await bcrypt.hash( password, 8);


        db.query("INSERT INTO users SET ?",{name: name, email: email, password: hashedPassword}, (err, results)=>{
            if(error){
                console.log(err);
            }else{
                console.log(results)
                return res.render("register",{
                    message: 'User registered!'
                });
            }
        });
    });
    
}


//login
exports.login = (req,res) =>{
    try{
       const {email, password} = req.body;
       if(!email || !password){
        return res.status(400).render("login",{
            message: "Please provide an email and password"
        });
       }
       db.query("SELECT * FROM users WHERE email=?",[email],async(err, results)=>{

        if( !results  || !(await bcrypt.compare( password, results[0].password)) ){
            return res.status(401).render("login",{
                message: "Email or Password is incorrect"
            });
        }else{
            //COOKIE
            const id = results[0].id;
            const token = jwt.sign({ id: id}, process.env.JWT_SECRECT, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("the token is: " + token);
            
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                ),
                httpOnly: true
            }
            
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/");
        }
       });
    }catch (err){
        console.log(err);
    }
}

//is logged in?
exports.isLoggedIn = async(req, res, next) => {
    console.log(req.cookies);
    //check if the cookie is empty
    if(req.cookies.jwt){
        try{
            // 1.verify the token
            globalThis.decoded = await promisify(jwt.verify)(req.cookies.jwt,
             process.env.JWT_SECRECT);
            console.log(decoded);
            
            // 2. check if the user still exists
            db.query('SELECT * FROM users WHERE id = ?',[decoded.id], (error, result) => {
                console.log(result);
                if(!result){
                    return next();
                }
                
                req.user = result[0];
                module.exports.name = req.user;
                return next();
            });
        }catch(err){
            console.log(err);
            return next();
        }
    }else{
        next();
    }
    
}