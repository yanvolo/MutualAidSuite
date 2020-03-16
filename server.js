//Dependencies
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

//Configs
//make way for some custom css, js and images
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//PORT Config
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

//Service Types
function static_serve(fileName,res){
  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp':Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('./public/' + fileName,options, function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Sent:',fileName);
    }
  });
}

//ROUTES
app.get('/',function(req, res){
  static_serve('index.html',res);
});

app.post('/submit',function(req,res){
  console.log("Hello World!");
});

module.exports = app;
