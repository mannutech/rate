module.exports ={
db: function db(body, callback){
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
				return callback(new Error(err));  		
			}
			else 
			{
				connection.end();
          		return callback(null,rows);  		
			}
					});

}
};