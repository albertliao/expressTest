'use strict';
 
//helper directive to fix ngAnimate issue with bootstrap carousel: https://github.com/angular-ui/bootstrap/issues/1350
module.exports = /*@ngInject*/ function($animate) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $animate.enabled(false, element);
      }
    };
};