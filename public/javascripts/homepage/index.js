'use strict';
angular.module('cpo')
 
	.controller('HomeController', require('./homeController'))
 	.directive('disableNgAnimate', require('./disableNgAnimateDirective'))	

	;