const express = require('express');
const router = express.Router();
const {handleCreateOrder,handleGetOrder}= require('../controllers/order')

router.post('/:id',handleCreateOrder)
router.get("/",handleGetOrder)

module.exports=router;