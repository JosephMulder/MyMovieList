var mysql = require('mysql');
var mysqlConfig = require('./config.js');
var dbURL = process.env.CLEARDB_DATABASE_URL || mysqlConfig;

var db = mysql.createPool(dbURL);

module.exports = db;