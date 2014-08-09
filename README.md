##jsonp

A simple jsonp example to drill in exactly how it works utilizing jquery on the client and express on the server.

jsonp's magic is it's skirting of the "same domain" requirement for xhr requests from javascript. Normally all requests must be on the same domain. Css and js can skirt this as they're both GET requests and you can GET from anywhere. Tapping into this then, you could add a script tag to your dom and point it at another domain. The resulting GET request is allowed even though it originates from javascript as it's requested for css or js by the browser. The trick then is to setup global function for receiving the data, and on the server side, place the data in that function name's function call. I always forget the latter for some reason. To reiterate, you call with a querystring parameter named "callback":
someurl?callback=myCallbackName
then server then returns:
myCallBackName({some json});

#### index.js
Nothing fancy here, just a GET handler what looks for a "callback" querystring parameter. If it exists, it wraps the json in that callback name, if not, just sends out the json.

#### index.html
A button for making the request and it's handler. Once clicked it calls the "jsonp" function with the url for the request and receives a promise in return. Upon resolving the promise it adds an LI to the UL for each value in the array.

#### doJsonp
Does the actual jsonp work. 
* Checks for the callback function's script block and if not there, adds it. 
* Utilizes a global variable to store the returned json data, and initializes it to "undefined". 
* Creates a deferred object for asynchronous results. 
* Appends the "callback=jsonpcb" to the url and adds a new script block, pointed at that url. 
* Polls the global variable (which will be set in the jsonpcb method call) to verify the data has been returned. If not set after 3 seconds, rejects the promise on a timeout error.
* Cleans up afterword by removing the url script block and stopping the timer loop.
