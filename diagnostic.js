const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');
const conn56 = mysql.createConnection(config.original_mysql_config);
const conn57 = mysql.createConnection(config.mysql_config);
const result = {};

conn56.connect();
conn57.connect();

const setResult = (key, val) => {
    result[key] = val;
}

const printResult = () => {
    console.log(result.sort());
}

const execute = query => {
    conn56.query({sql: query, timeout: 60000}, (err, results, fields) => {
        if (err) throw err
        setResult(query+'old', results[0].Cnt);
        conn57.query({sql: query, timeout: 60000}, (err, results, fields) => {
            if (err) throw err
            setResult(query+'new', results[0].Cnt);
        })
    })
}

try {
    const data = fs.readFileSync('./data', 'utf8');
    data.split("\n").map(str => {
        if (str) {
            var row = JSON.parse(str);
            var query = `SELECT '` + row.db + `.` + row.table + `' AS TableName, COUNT(*) AS Cnt FROM ` + row.db + `.` + row.table;
            execute(query);
        } else {
            printResult();
        }
    });
} catch (err) {
  console.error(err)
}

