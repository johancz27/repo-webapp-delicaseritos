const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { dirname } = require('path');

const app = express();

dotenv.config({path: path.join(__dirname,'../env/.env')});

const connection = require('./db');
const SqlStore = require('express-mysql-session')(session);
const serverSqlStore = new SqlStore({}, connection);

app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../app/views'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    key: 'keyboard name',
    secret: 'keyboard cat',
    store: serverSqlStore,
    resave: false,
    saveUninitialized: false,
}))

app.use(cookieParser());

const routes = require('../app/routes/routes');

app.use('/static', express.static(path.join(__dirname,'../public')));

app.use('/', routes);

module.exports = app;