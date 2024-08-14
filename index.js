const setConnection = require("./connection");
const PORT = 8000;
const express = require('express');
const app = express();
const dishRoute = require('./routes/dish')
const path = require("path");
const orderRoute = require('./routes/order')
const staticRouter = require('./routes/staticRoute')
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly, allowToUser} = require('./middleware/auth')

setConnection("mongodb+srv://mitalichhipa:xJcUsu3kw9n4Xa5G@cluster0.gp7a8.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))


app.use('/dish',restrictToLoggedinUserOnly,allowToUser(['ADMIN']),dishRoute);
app.use('/order',restrictToLoggedinUserOnly,allowToUser(['USER','ADMIN']), orderRoute);
app.use('/user',userRoute);
app.use('/',staticRouter);



app.listen(PORT);
