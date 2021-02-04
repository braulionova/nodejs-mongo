const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

//IMPORTAR VARIABLES DE ENTORNO LOCALES
require('dotenv').config({path: 'variables.env'});

console.log(process.env.DB_URL);

//conecting to db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('DB conected.'))
.catch(err => console.log(err));

//import routes
const indexRoutes = require('./routes/index');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));

//routes
app.use('/', indexRoutes);

//host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
//listen
app.listen(port, host, () => {
    console.log('Server is running');
})