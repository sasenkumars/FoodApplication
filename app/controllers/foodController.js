const path=require('path');
const foodModel=require(path.join(__dirname,"../models/food"));


exports.findAll=(req,res)=>{

    const pageSize= req.query.pageSize ? parseInt(req.query.pageSize) :0;
    const page=req.query.page ? parseInt(req.query.page) :0;
    const calories=req.query.calories ? parseInt(req.query.calories):0;

    foodModel.find({ calories: { $gte: calories}}).skip(page * pageSize).sort({name:1}).
    limit(pageSize).then((foods)=>{
        res.send(foods);
    }).catch(()=>{
        res.status(500).send(err);
    }) 
}


exports.findOne=(req,res)=>{

    foodModel.findById(req.params.id).then((food)=>{
        res.send(food);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })
    
};

exports.create=(req,res)=>{

    const {name,calories}=req.body;
    const foodObj={name,calories};
    const food=new foodModel(foodObj);

    food.save()
    .then((food)=>{
        res.status(201).send(food)
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
}

exports.update=(req,res)=>{

    foodModel.findByIdAndUpdate(req.params.id,req.body)
    .then((food)=>{
        res.send(food);
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
};


exports.delete=(req,res)=>{

    foodModel.findByIdAndDelete(req.params.id,req.body)
    .then((food)=>{
       
        if(!food)
        {
            res.status(404).send("no item found");
        }
        
        res.send();
    })
    .catch((error)=>{
        res.status(500).send(error);
    })
}