const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('work',['todos']);
const bodyParser = require('body-parser');
const ObjectId = require('mongojs').ObjectID;
var app = express();

app.use(bodyParser.urlencoded({ extended : false }));

app.use(bodyParser.json());


app.use(express.static(__dirname + "/public"));

app.get('/data',function (req,res) {
	db.todos.find(function (err,docs) {
		if (err) { throw err }
			res.send(docs);
	})
})

app.post('/removeTodo',function (req,res) {
	db.todos.remove( { _id : ObjectId(req.body.id)}, function (err,docs) {
		if (err) { throw err }
			res.send(docs)
	} )
})


app.post('/addNewTask',function (req,res) {
	var x = req.body.message;
	db.todos.insert({ msg : x, done : false } ,function (err,doc) {
		if (err) { throw err }
			res.send(doc)
	})
})

app.listen(3000,function () {
	console.log("listening on port 3000")
})