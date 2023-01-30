const jwt=require('jsonwebtoken');
const User=require('../models/user');

const verfifyAdminMiddleWare=(req,res,next)=>{    
    if(req.user==="admin")
    {
        next();
    }
    else
    {
        res.status(403).send({message:"User doesnot have admin access"});
    }
}

module.exports=verfifyAdminMiddleWare;