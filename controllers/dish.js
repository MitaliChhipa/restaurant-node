const dish = require('../models/dish');

async function handleGetAllDishes(req,res){
    const allDish = await dish.find({});
    res.render("dishes",{dishes:allDish})
}

async function handleCreateNewDish(req,res){
    try{
        await dish.create(req.body);
        const allDish = await dish.find({});
        return res.render("dishes",{dishes:allDish})
    }catch(error){
        const errorMessage = error.code === 11000 ? 
            `Dish with the name "${error.keyValue.dishName}" already exists.` : 
            'An error occurred while creating the dish.';
        return res.status(400).json({msg:errorMessage});
    }
    
}

async function handleDeleteDish(req,res){
    const id = req.params.id;
    await dish.findByIdAndDelete(id);
    const allDish = await dish.find({});
    return res.render("dishes",{dishes:allDish});
}

async function handleUpdateDish(req,res){
    try{
        const id = req.params.id;
        await dish.findByIdAndUpdate(id,req.body);
        const allDish = await dish.find({});
        return res.render("dishes",{dishes:allDish});
    }catch(error){
        const errorMessage = error.code === 11000 ? 
        `Dish with the name "${error.keyValue.dishName}" already exists.` : 
        'An error occurred while creating the dish.';
        return res.status(400).json({msg:errorMessage});
    }
}

async function handleUpdateOneValue(req,res){
    const id = req.params.id;
    const entity = await dish.findById(id);
    if(entity.quantity==0){
        return res.status(400).json({msg:`No ${entity.dishName} available`})
    }
    const decreaseQuantity =entity.quantity-1;
    await dish.findByIdAndUpdate(id,{quantity:decreaseQuantity});
    return res.status(200).json({msg:'successfully ordered'})
}


module.exports ={handleGetAllDishes, handleCreateNewDish, handleDeleteDish, handleUpdateDish, handleUpdateOneValue}