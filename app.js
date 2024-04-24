var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var setUpRouter = require('./routes/setup.js');
var transactRouter = require('./routes/transact.js');
var transactionsRouter = require('./routes/transactions.js');
var walletRouter = require('./routes/wallet.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/setup', setUpRouter);
app.use('/transact', transactRouter);
app.use('/transactions', transactionsRouter);
app.use('/wallet', walletRouter);

app.use(express.json());

module.exports = app;
