jsonp
=====

A simple jsonp example to drill in exactly how it works.

It's a simple get request with a callback parm in the querystring. For some reason, I always forget to have the server 
"wrap" the json in that function call: 
someurl?callback=myCallbackName >> server then returns:
myCallBackName({some json});

[[[doJsonp]]]
The client then requires a function exist by that name, and upon calling it, the data can be obtained. This example
is extremely simplified, but does it well enough. It creates a callback if it doens't exist, nulls out the data landing
variable, then creates a script block pointed to the given url. The server wraps the json in the callback name, and 
upon return, the callback is called, data deliveredd to a global variable, while the 
