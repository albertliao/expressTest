'use strict';

/**
 * @ngdoc overview
 * @name kiacpoApp
 * @description
 * # kiacpoApp
 *
 * Main module of the application.
 */
angular
	.module('cpo', [
	// 'ngAnimate',
	// 'ngCookies',
	// 'ngResource',
	// 'ngSanitize',
	'ngTouch',
	'ui.router',
	'ui.bootstrap'
	])
	
 	;

require('./homepage');   
require('./navbar'); 
require('./footer'); 
require('./dealer');
// require('./benifits'); 
// require('./kiacareservice');

require('./routes');

