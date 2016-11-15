
App deployed on Amazon EC2 Ubuntu instance .
Commands used to make Nodejs app work (https://www.terlici.com/2015/06/20/running-node-forever.html):

pm2 start app.js -i max &     => Main Entry point of App 

pm2 start cronjob.js -i max & => Cronjob that runs every 30 Minute
_______________________________________________________________________
1.Access the API on : http://52.66.116.173:8080/api/v0/rate

Runscope API testing results:
1. https://www.runscope.com/radar/07fsvpys63qv/bd7eb921-26ec-4cfc-81a1-451f7541c014/history/0c5c581e-85ce-494c-bdca-8db252e557b3 
	Description: All correct Inputs and Assertions Passed

2. https://www.runscope.com/radar/07fsvpys63qv/bd7eb921-26ec-4cfc-81a1-451f7541c014/history/d2ce67a0-0c20-4950-9ae5-fde75aa93d45
	Description: Incorrect SourceCurrency and Assertions checked for ALL PASS
----------------------------------------------------------------------------------------------------------------------------------------------------
To check the API BEHAVIOUR from RUNSCOPE:

	-------------------------------------------------
			TEST 1 : PASS
	-------------------------------------------------
1. Make a POST request to : 
https://api.runscope.com/radar/ddde0f1a-8869-401d-a916-2637bbfdcc71/trigger?runscope_environment=dcb6ec84-3b21-493f-bcc0-636c61a298fb

Attach parameters in x-www-form-urlencoded :

-> "CurrencyCode"

-> "Amount"

2. Check the test case results inside runscope account (Credentials given in Email).

	-------------------------------------------------
			TEST 2 : FAILURE
	-------------------------------------------------

For a FAILURE Check:
1. POST TO -> https://api.runscope.com/radar/ddde0f1a-8869-401d-a916-2637bbfdcc71/trigger?runscope_environment=123dd5d7-6fad-40f0-a478-49483601f1c6

2. If you pass values other than this mentioned below, you can see failure report in runscope dashboard. 

"CurrencyCode": GBP 

(HINT: pass values other than GBP)

------------------------------------------------------------------------------------

For Seeing the Caching Behaviour of requests:

1. Make proper POST requests to : http://52.66.116.173:8080/api/v0/rate    
__________Make this request twice from POSTMAN____________
2. In second request : You can find two extra headers in response 
    viz. apicache-store and apicache-version




    


