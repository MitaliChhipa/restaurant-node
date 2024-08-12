const express = require('express');
const Router = express.Router();
const {handleGetAllDishes, handleCreateNewDish, handleDeleteDish, handleUpdateDish, handleUpdateOneValue} = require('../controllers/dish');

Router.route('/').get(handleGetAllDishes).post(handleCreateNewDish);

Router.route('/:id').put(handleUpdateDish).delete(handleDeleteDish).patch(handleUpdateOneValue)

module.exports= Router;