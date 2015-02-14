var express = require('express');
var router = express.Router();
var path = require('path');
var glob = require("glob");
var fs = require("fs");
var extend = require('util')._extend

//load in CPO CMS data
var cpoData = {};
var partialData = {};
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
            partialData = extend(partialData,JSON.parse(data));
        });
        console.log(dir+"/"+filename+" loaded");
        loaded++;
    });
    cpoData.layout = 'cpo.hbs';
    console.log(loaded + " files loaded");
});

router.get('/', function(req, res) {
  res.render('home', cpoData);
});

router.get('/home', function(req, res) {
  res.render('home', cpoData);
});

router.get('/dealer', function(req, res) {
  res.render('dealer', cpoData);
});

router.get('/benifits', function(req, res) {
  res.render('benifits', cpoData);
});

router.get('/kiacareservice', function(req, res) {
  res.render('kiacareservice', cpoData);
});

router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render(name, partialData);
});

router.get('*', function (req, res) {
    res.render('index', cpoData);
});

module.exports = router;
