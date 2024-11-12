const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const currentUser = (req,res)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(201).json();
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({ message: 'Token is invalid or expired' });
        }
        return res.status(201).json({ user });
    })
}

module.exports = {currentUser}