var appRouter = function(app) {

	var apicache = require('apicache').options({ debug: true }).middleware;
	app.post("/api/v0/rate", apicache('10 seconds'),function(req, res) {

		if (req.method=='POST') 
		{
			/*	if(req.body.SourceCurrency ==='' && req.body.Amount ==='') 
				{
					req.body.SourceCurrency ='USD';
					req.body.Amount	=1.00;				
				}
				else if(req.body.SourceCurrency !='' && req.body.Amount =='')
				{
					req.body.Amount =1.00;
				}
				else if(req.body.SourceCurrency =='' && req.body.Amount !='')
				{
					req.body.SourceCurrency = 'USD';	
				}
			if(HandleIncomingRequest(req.body))
			{

			}
			*/
			if (req.body.SourceCurrency !=='' && req.body.Amount !=='') 
			{
					console.log(req);
					var db = require("./db.js");
					db.db(req.body,function callback(err,result){
							if (err) {
								req.body.err=err;
								req.body.returncode=400;
								var responseToSend=createResponse(result,req.body);
								res.json(JSON.stringify(responseToSend));
							}
							else
							{
								req.body.err="Success";
								req.body.returncode=1;
								var responseToSend=createResponse(result,req.body); 	
								var JSONresponse=JSON.stringify(responseToSend);
								 res.setHeader('Content-Type', 'application/json');
								res.json(responseToSend);
							}
							//Function call for response structuring
							//console.log(result);
                    }); 
                    
			}
			else 
			{ 		//if (req.body.Amount === '' && req.body.SourceCurrency ==='') {}
					var Amount=req.body.Amount || 1.00;
					req.body.Amount=Amount;
					var SourceCurrency=req.body.SourceCurrency || 'USD';
					req.body.SourceCurrency=SourceCurrency;
					var db = require("./db.js");
					db.db(req.body,function callback(err,result){
							if (err) {
								req.body.err=err.message;
								req.body.returncode=400;
								var responseToSend=createResponse(result,req.body);
								console.log(err.message);
							}
							else
							{
								req.body.err="Success";
								req.body.returncode=1;
								var responseToSend=createResponse(result,req.body); 	
								var JSONresponse=JSON.stringify(responseToSend);
								 res.setHeader('Content-Type', 'application/json');
								res.json(responseToSend);
							}
							//Function call for response structuring
							//console.log(result);
                    }); 
			}
	/*		
	function HandleIncomingRequest(req.body)
	{	
		n=req.body.Amount;
		if(typeof req.body.SourceCurrency !== 'undefined' && typeof req.body.Amount !== 'undefined')
		{
			if( !isNaN(parseFloat(n)) && isFinite(n))
		{

		}

		}
		

		if (typeof(req.body.SourceCurrency)==='undefined') req.body.SourceCurrency='USD';
   		if (typeof(req.body.Amount)==='undefined') req.body.Amount=1.0;

	}*/
	function createResponse(result,input)
{
	var output=JSON.stringify(result);
	output=JSON.parse(output);
	var Response = {};
	Response['SourceCurrency']=input.SourceCurrency;
	var TotalAmount=parseFloat(parseFloat(1/output[0].conversion_value)*input.Amount);
	Response['ConversionRate']=(1/output[0].conversion_value).toFixed(2);
	Response['Amount']=input.Amount;
	Response['Total']=TotalAmount.toFixed(2);
	Response['returncode']=input.returncode;
	Response['err']=input.err;
	Response['timestamp']=output[0].last_updated;
	return Response;
}


		/*req.pause();
		res.status = 400;
		res.end();	    	
		*/
		}
		else //CHECk for is POST request
		{
			res.status = 400;
			res.end();	    		
		}
		
		
});

 
}
 
module.exports = appRouter;