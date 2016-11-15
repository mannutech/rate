var appRouter = function(app) {

	var api = require('apicache').options({ debug: true });
	var realcache=api.middleware;
	function onlyParameter(req,res)
			{
				var response =api.getIndex();
				console.log("Get-Index",response);
				var res= response['groups'];
				res=Object.keys(res);
				req.apicacheGroup=res[0];
				console.log("req.apicacheGroup =",req.apicacheGroup);				
				if(req.body.SourceCurrency!==req.apicacheGroup)
				{		
						console.log("req.body.SourceCurrency!==res[0] =>",req.body.SourceCurrency!==res[0]);
						console.log("Before",req.apicacheGroup);
						var checkBefore=req.apicacheGroup;
						req.apicacheGroup=req.body.SourceCurrency;
						var checkAfter=req.apicacheGroup;
						console.log("After",req.apicacheGroup);
						if(typeof(checkBefore)==='undefined')
						{
							return true;
						}
						else
						{
							if(checkBefore!=checkAfter)
							{ api.clear(checkBefore);
								return true;	}
							else
							{
								return false;
							}
						}
						
				}
				else
				{
					return true;
				console.log("ELse Part : req.body.SourceCurrency!==res[0] =>",req.body.SourceCurrency!==res[0]);
				if(req.apicacheGroup===req.body.SourceCurrency)//req.body.SourceCurrency)
				{
					return true;
				}

				}
				
				}
				
			
											 
			
	app.post("/api/v0/rate", realcache('20 seconds',onlyParameter),function(req, res) {
		
		if (req.method=='POST') 
		{
			req.apicacheGroup=req.body.SourceCurrency;
			var SourceCurrency=	req.body.SourceCurrency;
			if(SourceCurrency !='USD' && SourceCurrency !='GBP' 
			   &&SourceCurrency !='CAD' &&SourceCurrency !='AUD'
			   &&SourceCurrency !='SDG' &&SourceCurrency !='EUR'
			   && SourceCurrency !='')
					{
								req.body.SourceCurrency=SourceCurrency;	
								req.body.err="Not supported Type";
								//req.body.returncode=400;
								//var responseToSend=createResponse(null,req.body);
								//res.json(JSON.stringify(responseToSend));
								res.status=400;
								res.setHeader('Content-Type', 'application/json');
								res.json({err:req.body.err});
					}
					else
					{
						if (req.body.SourceCurrency !=='' && req.body.Amount !=='') 
			{
				

					var db = require("./db.js");
					db.db(req.body,function callback(err,result){
							if (err) {
								req.body.err=err;
								req.body.returncode=400;
								var responseToSend=createResponse(result,req.body);
								//res.json(JSON.stringify(responseToSend));
								res.setHeader('Content-Type', 'application/json');
								res.json(responseToSend);
							}
							else
							{
								req.body.err="Success";
								req.body.returncode=1;
								var responseToSend=createResponse(result,req.body); 	
								//var JSONresponse=JSON.stringify(responseToSend);
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
					}
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