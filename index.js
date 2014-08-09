var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var userCards = {
	dk: [
		{id: 101, number: '1111', name: 'dank'},
		{id: 102, number: '2222', name: 'dank1'}
	]
};

app.get('/user/:userId/card', function(req, res){
	var cards = userCards[req.params.userId] || [];
	if(req.query.callback){
		cards = req.query.callback + '(' + JSON.stringify(cards) + ')';
		res.setHeader('Content-Type', 'application/javascript');
	}//jsonp
	res.send(cards);
});

app.listen(3000);
console.log('listening on 3000');

