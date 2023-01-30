const jwt=require('jsonwebtoken');
const User=require('../models/user');

const verfityTokenMiddleWare=(req,res,next)=>{    
    
    if(req.headers && req.headers.authorization)
    {
        //token is coming 

        const token=req.headers.authorization.split(' ')[1];

        //verify whether this token is correct or not 

        jwt.verify(token,process.env.secretKey || "wqfljbfhlqwbfljhqwbhqlhqwbfjcnlanfjklqblkjfqlfbqk",(err,decode)=>{

            if(err)
            {

                req.user=undefined;
                
                    res.status(403).send({message:"Invalid JWT token"});
                

                next();
            }

            User.findOne({
                _id:decode.id
            })
            .exec((err,user)=>{
                if(err){
                    res.status(500).send({message:err})
                }
                else
                {
                    req.user=user;
                    next();
                }
            })
        })

    }
    else
    {
        
    //   req.user=undefined;
    //   next();

        res.status(403).send({message:"Invalid JWT token"});
    
    }

}

module.exports=verfityTokenMiddleWare;