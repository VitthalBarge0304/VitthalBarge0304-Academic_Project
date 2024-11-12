const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const signup = async (req,res)=>{
    const {name,email,password,role} = req.body

    const userExist = await User.findOne({email})

    if(userExist){
        return res.status(400).json({Message:'User Already p-resent'})
    }

    const user = new User({name, email,password,role})

    try{
        await user.save();
        const token = jwt.sign({id:user._id,email:user.email,role:user.role,name:user.name},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        res.cookie('jwt', token, {
            httpOnly: true,       
            secure: process.env.NODE_ENV === 'production', 
           maxAge:  3600000,     
            SameSite: 'None',   
            path: '/'
          });
        return res.status(201).json(
            {token,
            message:'User Created succesfully'}
        )
    }catch(err){
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await user.matchPassword(password)
    if(!isPasswordMatch){
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({id:user._id,role:user.role,name:user.name},process.env.JWT_SECRET,{
        expiresIn:'1h'
    })

    res.cookie('jwt', token, {
        httpOnly: true,       // Prevents JavaScript from accessing the cookie
       secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
       maxAge: 60 * 60 * 1000,   
        SameSite: 'None',   
        path: '/'
      });

    return res.status(201).json({
        name:user.name,
        role:user.role,
        message:'Logged in successfully'
    })
}
const logout = async (req,res)=>{
    res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', SameSite: 'None' , path:'/'});
    res.status(200).send({ message: 'Logged out successfully' });
}

module.exports = {signup,login,logout}