/*'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);
*/
var express=require('express');
var path=require("path");
var app=express();
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
app.get('/',function(req,res){
	//res.send("hello world");
	//res.render('index');
	res.sendFile(path.join(__dirname+'/public/default.html'));
});
app.get("/:indate([0-9]+)",function(req,res){
	var para=req.params.indate;
	var out={};
	var d=new Date(Number(para*1000));
	if(d){
		var natdate=d.toDateString().split(" ");
		natdate=natdate.slice(1);
		natdate=natdate.join(" ");
		
		out["natural"]=natdate;
		out["unix"]=para;
	res.send(JSON.stringify(out));
	}
	else{
		out["natural"]=null;
		out["unix"]=null;
	res.send(JSON.stringify(out))
	}
});
app.all("/*",function(req,res){
	var para=req.params[0];
	var out={};
	var d=new Date(para);
	if(d){
		out["natural"]=para;
		out["unix"]=d.getTime()/1000;
	res.send(JSON.stringify(out));
	}
	else{
		out["natural"]=null;
		out["unix"]=null;
	res.send(JSON.stringify(out))
	}
});