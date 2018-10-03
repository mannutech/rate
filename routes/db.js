module.exports = {
    db: function db(body, callback) {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'phpmyadmin',
            database: 'mannu'
        });
        var SourceCurrency = body.SourceCurrency || 'USD';
        var query = 'SELECT * FROM mannu.currency WHERE currency.currency_code=' + "'" + SourceCurrency + "'";
        console.log(query);
        connection.connect((err) => { if (err) { console.log(err); } });
        connection.query(query, (err, rows) => {
            if (err) {
                return callback(new Error(err));
            } else {
                connection.end();
                return callback(null, rows);
            }
        });

    }
};