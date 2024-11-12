const jwt = require('jsonwebtoken')

const protect = (req,res,next)=>{
    let token
    if(req.cookies && req.cookies.jwt){
        try{
            token = req.cookies.jwt;

            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = {id:decoded.id,role:decoded.role};
            next();
        }catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
          }
    }else{
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
}

module.exports = {protect}