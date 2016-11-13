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
					req.body.Amount='1.00';
					var db = require("./db.js");
					var result=[];
					db.db(req.body,function callback(err,result){
						if(err)
						{
							console.log(err);		
						}
                    console.log(result);
                    
                    //connection.end();
                    }); 
                                        //console.log(db.connectionFromRoutes);
			}

			    	
		}
		req.pause();
		res.status = 400;
		res.end();
		
});
 
}
 
module.exports = appRouter;