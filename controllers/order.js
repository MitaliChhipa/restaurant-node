const order = require('../models/order')
const dish = require("../models/dish");

async function handleCreateOrder(req,res){
        const id = req.params.id;
        const entity = await dish.findById(id);
        if(entity.quantity==0){
            return res.status(400).json({msg:`No ${entity.dishName} available`})
        }
        const decreaseQuantity =entity.quantity-1;
        await dish.findByIdAndUpdate(id,{quantity:decreaseQuantity});
        
    
    await order.create({
        orderedItem: entity.dishName,
        date: new Date().toLocaleDateString('en-GB'),
        orderedBy: req.user._id
    })
    const alldish=await dish.find({});
    const userOrder = await order.find({orderedBy:req.user._id})
    return res.render('order',{dishes:alldish,orders:userOrder});
}

async function handleGetOrder(req,res){
    const alldish=await dish.find({});
    const userOrder = await order.find({orderedBy:req.user._id})
    res.render("order",{dishes:alldish,orders:userOrder});
}
module.exports = {handleCreateOrder,handleGetOrder}