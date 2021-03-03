const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const todoRouter = require('./server/routes/todoRouter')


dotenv.config({path: 'config.env'})

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
// set the view engine
app.set('view engine', 'ejs');

//connect to DB
connectDB();

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use('/', todoRouter);

app.listen(PORT,()=> console.log('Server started at port '+ PORT));