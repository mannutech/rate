var cron = require('cron');
var mysql = require('mysql');
var request = require("request");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'phpmyadmin',
    database: 'mannu'
});
var cronJob = cron.job(" 0,30 * * * *", () => { //0 * * * * *
    // request to hit another API
    request.get("http://api.fixer.io/latest?base=INR&symbols=USD,GBP,AUD, EUR, CAD, SGD", function(error, response, responsebody) {
        //console.log(extract);
        var parsed = JSON.parse(responsebody);
        for (var key in parsed.rates) {
            if (parsed.rates.hasOwnProperty(key)) {

                var values = parsed.rates[key];
                dbsave(key, values);
            }
        }

    });
    console.info('cron job completed');
});
cronJob.start();

function dbsave(currency_code, currency_value) {
    var query = 'UPDATE currency SET mannu.currency.conversion_value =' + "'" + currency_value + "'" + ',currency.last_updated =' + new Date().getTime() + ' WHERE currency.currency_code=' + "'" + currency_code + "'";

    // /connection.connect(function(err){ if (err) { console.log(err);}});
    connection.query(query, [currency_value], (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.log(rows);
        //console.log('The solution is: ', rows);
        //connection.end();
    });
}