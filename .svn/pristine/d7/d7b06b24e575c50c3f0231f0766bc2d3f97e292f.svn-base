var express = require('express');
var router = express.Router();
var path = require('path');
var glob = require("glob");
var fs = require("fs");
var extend = require('util')._extend
var request = require('request');

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

  // request('http://www.kia.com/us/en/data/dealers/inventory?itemsPerPage=10&pageNumber=1&radius=50&sendDealers=true&sendFilters=true&sendVehicles=true&series=optima&year=2015&zipCode=92627', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var data = JSON.parse(body);
  //     var locals = {
  //       "dealers": data.dealerInventoryResult[0].dealers,
  //     };
  //     //console.log(locals);
  //     res.render('dealer', extend(cpoData,locals));
  //   }
  //   else {
  //     console.log('error: '+ response.statusCode);
  //     console.log(body);
  //   }
  // });

  request('http://cpo.as8.cdev.kia.com:8081/cpo/dealer/getNear/92614/50', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var locals = {
        "dealers": data
      };
      //console.log(locals);
      res.render('dealer', extend(cpoData,locals));
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
  cpoData.layout = '';
  res.render(name, cpoData);

  //return to default layout
  cpoData.layout = 'cpo.hbs';
});

router.get('*', function (req, res) {
    res.render('index', cpoData);
});

module.exports = router;
