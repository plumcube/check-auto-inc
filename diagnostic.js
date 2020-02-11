const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const connection = mysql.createConnection(config.mysql_config);

const execute = query => {
    connection.then(client => {
        client.query(query, (err, results, fields) => {
            if (err) throw err
            console.log(results);
        });
    })
    .catch(err => {
        console.log(err)
    });
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

