const user = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser} = require('../service/auth')

async function handleSignupUser(req,res){
    try{
        await user.create(req.body);
        return res.redirect('/login');
    }catch(error){
        const errorMessage = error.code === 11000 ? 
        `user with email "${error.keyValue.email}" already exists.` : 
        'An error occurred while creating the user.';
        return res.status(400).json({msg:errorMessage});
    }
}

async function handleLoginUser(req,res){
    const { email, password } = req.body
    const currUser = await user.findOne({ email, password });
    if(!currUser){
        return res.render("login",{error:"Email/Password is invalid"})
    }
    const sessionId = uuidv4();
    setUser(sessionId,currUser);
    res.cookie("uid", sessionId);

    return res.redirect('/order');
}

module.exports={handleSignupUser, handleLoginUser}