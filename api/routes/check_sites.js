var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/check_sites', function(req, res, next) {
  let url = "https://www.google.com";
  request(url, (error, response, body) => {
  	  res.send(response.statusCode);
  });
});

//router.get("/", function(req, res, next) {
//    res.send("API is working properly"+3);
//});

module.exports = router;