const pgp = require('pg-promise')();
const uri = process.env.DATABASE_URI;
 
const db = {
/**
* getAll - queries db and outputs all columns and rows for a given table
* 
* @param {string} table - name of db table to query
*/
  getAll: (table) => {
    return db.conn.any(`SELECT * FROM ${table}`);
  }
};

//connection to the pg-promise database through uri listed in our secret file
db.conn = pgp(uri);

console.log(`connected to DB: ${uri}`);

module.exports = db;
