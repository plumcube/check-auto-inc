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

const ssh_host = {
    host: '10.211.55.13',
    user: 'vagrant',
    password: 'vagrant'
};

const mysql_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'dev_buzz_db'
};

const connection = mysqlssh.connect(ssh_host, mysql_config);

const execute = query => {
    connection.then(client => {
        client.query(query, function (err, results, fields) {
            if (err) throw err
            console.log(results[0].Result);
            mysqlssh.close()
        })
    })
    .catch(err => {
        console.log(err)
    })
}

execute('SELECT 1+1 AS Result');