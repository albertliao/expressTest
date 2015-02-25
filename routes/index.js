var express = require('express');
var router = express.Router();
var path = require('path');
var glob = require("glob");
var fs = require("fs");
var extend = require('util')._extend
var request = require('request');
//var expstate = require('express-state');

//var app = express;
//enables .expose() function
//expstate.extend(app);

//load in CPO CMS data
var cpoData = {};
glob("./data/**/*.json", function(err, files) {
    var loaded = 0;
    files.forEach(function(file) {
        var dir = path.dirname(file);
        var filename = path.basename(file);
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
              console.log('Error: ' + err);
              return;
            }
            cpoData = extend(cpoData,JSON.parse(data));
        });
        console.log(dir+"/"+filename+" loaded");
        loaded++;
    });
    console.log(loaded + " files loaded");
});

router.get('/', function(req, res) {
  res.render('home', cpoData);
});

router.get('/home', function(req, res) {
  res.render('home', cpoData);
});

router.get('/dealer', function(req, res) {

  request('http://cpo.as8.cdev.kia.com:8081/cpo/dealer/getNear/92614/25', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      res.locals.dealers = data;
      res.render('dealer', cpoData);
    }
    else {
      console.log('error: '+ response.statusCode);
      console.log(body);
    }
  });

});

router.get('/partials/dealer.hbs', function (req, res) {
  res.locals.layout = '';
  res.locals.isPartial = true;

  request('http://cpo.as8.cdev.kia.com:8081/cpo/dealer/getNear/92614/25', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      res.locals.dealers = data;
      res.render('dealer', cpoData);
    }
    else {
      console.log('error: '+ response.statusCode);
      console.log(body);
    }
  });

});

router.get('/benifits', function(req, res) {
  res.render('benifits', cpoData);
});

router.get('/kiacareservice', function(req, res) {
  res.render('kiacareservice', cpoData);
});

router.get('/partials/:name', function (req, res) {
  var name = req.params.name;

  res.locals.layout = '';
  res.locals.isPartial = true;

  res.render(name, cpoData);
});

router.get('*', function (req, res) {
    res.render('index', cpoData);
});

module.exports = router;
