
var appRouter = function(app) {

	app.post("/api/v0/rate", function(req, res) {

		if (req.method=='POST') 
		{
			if (req.body.SourceCurrency !='' && req.body.Amount !='') 
			{
				console.log(req.body);	
			}
			else
			{
					req.body.SourceCurrency='USD';
					Amount='1.00';
					console.log(req.body);
					var dbsave = require("./db.js")(req.body);
			}

			    	
		}
		req.pause();
		res.status = 400;
		res.end();
		
});
 
}
 
module.exports = appRouter;
