const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const conn56 = mysql.createConnection(config.original_mysql_config);
const conn57 = mysql.createConnection(config.mysql_config);

conn56.connect();
conn57.connect();

const execute = query => {
    conn56.query(query, (err, results, fields) => {
        if (err) throw err
        console.log(results);
        conn57.query(query, (err, results, fields) => {
            if (err) throw err
            console.log(results);
        })
    })
}

try {
    const data = fs.readFileSync('./data', 'utf8');
    data.split("\n").map(str => {
        var row = JSON.parse(str);
        var query = `SELECT ` + row.db + `.` + row.table + `, COUNT(*) FROM ` + row.db + `.` + row.table;
        execute(query);
    });
} catch (err) {
  console.error(err)
}

