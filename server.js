// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'dev_buzz_db'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();


const mysqlssh = require('mysql-ssh');

mysqlssh.connect(
    {
        host: '10.211.55.13',
        user: 'vagrant',
        password: 'vagrant'
    },
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'dev_buzz_db'
    }
)
.then(client => {
    client.query('SELECT 1+1 AS Result', function (err, results, fields) {
        if (err) throw err
        console.log(results);
        mysqlssh.close()
    })
})
.catch(err => {
    console.log(err)
})