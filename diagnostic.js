const mysqlssh = require('mysql-ssh');
const config = require('./config');
const fs = require('fs');
const connection = mysqlssh.connect(config.ssh_host, config.mysql_config);


try {
    const data = fs.readFileSync('./data', 'utf8');
    data.split("\n").map(str => {
        var obj = JSON.parse(str);
        console.log(obj);
    });
} catch (err) {
  console.error(err)
}

// let query = `
//     SELECT t.AUTO_INCREMENT, c.COLUMN_NAME, t.TABLE_SCHEMA, t.TABLE_NAME
//     FROM
//     information_schema.tables t
//     INNER JOIN information_schema.columns c ON c.TABLE_SCHEMA = t.TABLE_SCHEMA AND c.TABLE_NAME = t.TABLE_NAME
//     WHERE c.extra = 'auto_increment'
//     AND t.auto_increment != 1
//     AND t.TABLE_TYPE = 'BASE TABLE'`;

// connection.then(client => {
//     client.query(query, (err, results, fields) => {
//         if (err) throw err

//         results.map(row => {
//             let query2 = `
//             SELECT '` + row.TABLE_SCHEMA + `', '` + row.TABLE_NAME + `', ` + row.AUTO_INCREMENT + ` AS AUTO_INCREMENT, MAX(` + row.COLUMN_NAME + `)
//             FROM ` + row.TABLE_SCHEMA + `.` + row.TABLE_NAME + ` HAVING MAX(` + row.COLUMN_NAME + `) + 1 != ` + row.AUTO_INCREMENT;
//             connection.then(client => {
//                 client.query(query2, (err, results, fields) => {
//                     if (err) throw err
//                     if (results.length) console.log(results);
//                 });
//             });
//         });
//     });
// })
// .catch(err => {
//     console.log(err)
// });




