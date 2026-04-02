const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token) {
        res.status(403).send(" No Tken");
    }
 
   try {
    const user = jwt.verify(token,"secret");
    req.userId = user.id;
    next();
   } catch(error){
       res.status(401).send(" Invalid Token");
   } 
} 

module.exports= authMiddleware;
 