const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');

// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"aditya.ajaysingh2002@gmail.com",
        pass:"xxzu jvch bknx ojbm"
    }
    
})

const JWT_SECRET = 'Addyisagoodboy'


//ROUTE:1 create a user using end point post "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 charcters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //Check weather the user of the email is already existed
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)

        // creating a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
success = true;
        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }

})

//ROUTE:2 Authenticate the user using post "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there is error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "username or password are incorrect" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "username or password are incorrect" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("something is very very wrooong (ayeinnnn)")
    }
})


// ROUTE: 3 Authenticate the user using post "/api/auth/login"
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user); 
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error (ayeinnnn)")
}
})



// forger password verification link

router.post('/sendpasswordlink',async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(400).json({ error: "Enter a valid email" });
    }
    try {
        const userfind = await User.findOne({email:email})
        
// token generate for reset password
        const token = jwt.sign({_id:userfind._id},JWT_SECRET,{
            expiresIn:"180s"
        });
        
        const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true})

        if(setusertoken){
            const mailOption={
                from:"aditya.ajaysingh2002@gmail.com",
                to:email,
                subject:"Sending verification email for password reset",
                text: `THIS LINK IS VALID ONLY FOR 3 MINUTES http://localhost:3000/reset-password/${userfind.id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailOption,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"Email not send"})
                }
                else{
                    console.log("email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent successfully"})
                }
            })
        }
        
    } catch (error) {
        res.status(401).json({status:401,message:"Email not send"});
    }
})



module.exports = router
