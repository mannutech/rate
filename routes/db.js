
	var connectionFromRoutes = function(body){
		var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'phpmyadmin',
	  database : 'mannu'
	});

	var query = 'SELECT * FROM mannu.currency WHERE currency.currency_code='+"'"+body.SourceCurrency+"'";
	console.log(query);
	connection.connect(function(err){ if (err) { console.log(err);}});
		connection.query(query, function(err,rows) {
			if (err) {
				console.log(err);
			}

	  console.log('The solution is: ', rows);
	  connection.end();
});

}


module.exports = connectionFromRoutes;