//Handlebars helpers
'use strict';

exports.yell = function (msg) {
    return msg.toUpperCase();
};

exports.json = function(obj) {
    return JSON.stringify(obj);
  };