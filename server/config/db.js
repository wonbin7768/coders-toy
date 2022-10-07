const mysql = require("mysql2");
const config = require("../db.json");

const pool = mysql.createPool(config);

module.exports = pool;