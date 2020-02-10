const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config.mysql_config);

connection.connect();

let query = `
    SELECT t.AUTO_INCREMENT, c.COLUMN_NAME, t.TABLE_SCHEMA, t.TABLE_NAME
    FROM
    information_schema.tables t
    INNER JOIN information_schema.columns c ON c.TABLE_SCHEMA = t.TABLE_SCHEMA AND c.TABLE_NAME = t.TABLE_NAME
    WHERE c.extra = 'auto_increment'
    AND t.auto_increment != 1
    AND t.TABLE_TYPE = 'BASE TABLE'`;

connection.query(query, (err, results, fields) => {
    if (err) throw err;
    results.map(row => {
        let query2 = `
        SELECT '` + row.TABLE_SCHEMA + `', '` + row.TABLE_NAME + `', ` + row.AUTO_INCREMENT + ` AS AUTO_INCREMENT, MAX(` + row.COLUMN_NAME + `)
        FROM ` + row.TABLE_SCHEMA + `.` + row.TABLE_NAME + ` HAVING MAX(` + row.COLUMN_NAME + `) + 1 <= ` + row.AUTO_INCREMENT;
        connection.query(query2, (err, results, fields) => {
            if (err) throw err
            if (results.length) {
                results.map(x => console.log(x));
            }
        });
    });
});

// connection.end();