(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    // 'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ]);

require('./routes');

require('./homepage');   
require('./navbar'); 
require('./footer'); 


},{"./footer":3,"./homepage":6,"./navbar":7,"./routes":9}],2:[function(require,module,exports){
'use strict';

module.exports = /*@ngInject*/ ['$scope', function($scope) {

	$scope.test = 'test';

// 	  $http({'method':'GET','url':'data/navData.json'}).success(function(response){
// 	console.log('resp',response.preownedcertifiedlogo1);
// 	    $scope.data=response;
// 	    $scope.hedersL1=response.headnavL1;
// 	    $scope.hedersL2=response.headnavL2;
// 	    $scope.sideNav=response.sideNav;
// 	    $scope.featureList=response.featureList;
// 	  });

  }];
},{}],3:[function(require,module,exports){
'use strict';
angular.module('cpo')

	.controller('footerController', require('./footerController'))

	;
},{"./footerController":2}],4:[function(require,module,exports){
'use strict';
 
//helper directive to fix ngAnimate issue with bootstrap carousel: https://github.com/angular-ui/bootstrap/issues/1350
module.exports = /*@ngInject*/ ['$animate', function($animate) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $animate.enabled(false, element);
      }
    };
}];
},{}],5:[function(require,module,exports){
'use strict';

module.exports = /*@ngInject*/ ['$scope', '$window', function($scope,$window) {

    $scope.slideInterval = 2500;
    $scope.desktopView =  false;
    $scope.tabletView = false;
    $scope.prvBtn = 'inactive';
    $scope.nextBtn = 'active';

    $scope.selection = 'default';
    $scope.slides = [
        {
            image: 'images/car1.png'
        },
        {
            image: 'images/car2.png'
        },
        {
            image: 'images/car3.png'
        }
    ];

    $scope.status = 'ready';

    angular.element($window).bind('resize', function () {
      $scope.decideViews();
    });
    $scope.decideViews = function(){
         if($window.innerWidth>=1024){
            $scope.desktopView = true; 
            $scope.tabletView = false;
        }
        else if($window.innerWidth<1024){
            $scope.tabletView = true;
            $scope.desktopView =  false;
        }
        if($window.innerWidth<767){
           
            if(angular.element('.menuBanner-link').parent('li').find('ul').hasClass('dropdown-menu')){
                    console.log('we are at home controller');
            }else{
                angular.element('.menuBanner-link').parent('li').find('ul').addClass('dropdown-menu');
            }
           
        }
        else if($window.innerWidth>=768){
            if(angular.element('.menuBanner-link').parent('li').hasClass('open')){
                angular.element('.menuBanner-link').parent('li').removeClass('open');
            }
            if(angular.element('.menuBanner-link').parent('li').find('ul').hasClass('dropdown-menu')){
                angular.element('.menuBanner-link').parent('li').find('ul').removeClass('dropdown-menu');
            }
        }
    };
      $scope.decideViews();  
    $scope.showExploreMenu = function(e){
        if($window.innerWidth<768){
               if(angular.element(e.currentTarget).parent('li').hasClass('open')){
                    angular.element(e.currentTarget).parent('li').removeClass('open');
               } 
               else{
                    angular.element(e.currentTarget).parent('li').addClass('open');
               }
        }
    };
    $scope.previousBanner = function(e){
        if(angular.element(e.currentTarget).hasClass('inactive')){
                console.log('disable mode');
        }
        else{
            if($scope.desktopView){
                if($scope.selection === 'second'){
                    $scope.selection = 'default';
                    
                    angular.element('.next-banner').removeClass('inactive');
                    angular.element(e.currentTarget).removeClass('active');
                    angular.element(e.currentTarget).addClass('inactive');
                    angular.element('.next-banner').addClass('active');

                   
                }
            }
            else if($scope.tabletView){
                if($scope.selection === 'second'){
                    $scope.selection = 'default';
                    
                    angular.element(e.currentTarget).removeClass('active');
                    angular.element(e.currentTarget).addClass('inactive');
                   
                }
                else if($scope.selection === 'third'){
                    $scope.selection = 'second';
                     $scope.nextBtn = 'active';

                    angular.element('.next-banner').removeClass('inactive');
                    angular.element('.next-banner').addClass('active');
                }                        
            }
        }
    };
    $scope.nextBanner = function(e){
        if(angular.element(e.currentTarget).hasClass('inactive')){
                console.log('disable mode');
        }
        else{
            if($scope.desktopView){
                if($scope.selection === 'default'){
                    $scope.selection = 'second';

                    angular.element('.prev-banner').removeClass('inactive');
                    angular.element('.prev-banner').addClass('active');
                    angular.element(e.currentTarget).removeClass('active');
                    angular.element(e.currentTarget).addClass('inactive');

                   
                }
            }
            else if($scope.tabletView){
                if($scope.selection === 'default'){
                    $scope.selection = 'second';
                    $scope.prvBtn = 'active';

                    angular.element('.prev-banner').removeClass('inactive');
                    angular.element('.prev-banner').addClass('active');
                    

                }
                else if($scope.selection === 'second'){
                    $scope.selection = 'third';
                    angular.element(e.currentTarget).removeClass('active');
                    angular.element(e.currentTarget).addClass('inactive');

                }                        
            }
        }
    };
}];
},{}],6:[function(require,module,exports){
'use strict';
angular.module('cpo')
 
	.controller('HomeController', require('./homeController'))
 	.directive('disableNgAnimate', require('./disableNgAnimateDirective'))	

	;
},{"./disableNgAnimateDirective":4,"./homeController":5}],7:[function(require,module,exports){
'use strict';
angular.module('cpo')
 
	.controller('NavBarController', require('./navBarController'))

	;
},{"./navBarController":8}],8:[function(require,module,exports){
'use strict';

module.exports = /*@ngInject*/ ['$scope', '$timeout', '$window', function($scope,$timeout,$window){



  //   $http({'method':'GET','url':'data/navData.json'}).success(function(response){    
  // console.log('resp',response.preownedcertifiedlogo1);
  //     $scope.data=response;
  //     $scope.hedersL1=response.headnavL1;
  //     $scope.hedersL2=response.headnavL2;
  //     $scope.sideNav=response.sideNav;
  //     $scope.featureList=response.featureList;
  //   });

    $scope.isCollapsed = true;
    $scope.isCollaps = true;
    $scope.isSearch = true;
    $scope.showFooter = false;

    $scope.searchActive = false;
    $scope.navActive = false;

    $scope.kiaLogo = function(){
              console.log('click to kia.com');
    };

    angular.element($window).bind('resize', function () {
      if($window.innerWidth>=768){
          $scope.showFooter = false;
          if(angular.element('.dropdown-toggle')){
                 angular.element('.dropdown-toggle').removeClass('dropdown-toggle');
          }
           
          if(angular.element('.open')){
              angular.element('.open').removeClass('open');
          }
      }
    });
   $scope.search = function(e){
        $scope.isSearch = !$scope.isSearch;
       
        if(angular.element(e.currentTarget).hasClass('selected')){
             angular.element('.search-div').removeClass('show');
            angular.element(e.currentTarget).removeClass('selected');
            if($window.innerWidth<768){
              if($scope.navActive){
                  console.log('nav button is active');
              }else{
                 $scope.showFooter = false;
              }
             $scope.searchActive = false;
            }
            
        }
        else{
           angular.element('.search-div').addClass('show');
          angular.element(e.currentTarget).addClass('selected');
          if($window.innerWidth<768){
              $scope.showFooter = true;
          } 
          $scope.searchActive = true;
        }
          
       
    };
   
    $scope.homeLink =  function(){
        console.log('navigate  to home.html');
    };
     $scope.showMobieMenu = function(e){
        console.log(e.currentTarget);
          if(angular.element('#bs-example-navbar-collapse-1').hasClass('in')){
              angular.element('.menu-icon').removeClass('active-icon');
              angular.element('#bs-example-navbar-collapse-1').removeClass('in');
               if($scope.searchActive){
                    console.log('serach button is active');
               }
               else{
                   $scope.showFooter = false;
               }
               $scope.navActive = false;
                
          }
          else{
                angular.element('.menu-icon').addClass('active-icon');
                angular.element('#bs-example-navbar-collapse-1').addClass('in');
                 $scope.showFooter = true;
                 $scope.navActive = true;
          }
    }; 
    
    $scope.showRed = function(e){
        angular.element(e.currentTarget).parent('div.searchBox').find('i').addClass('red');
    };
    $scope.hideRed = function(e){
        angular.element(e.currentTarget).parent('div.searchBox').find('i').removeClass('red');
    };
    $scope.firstMenu = function(e){
      console.log($scope.showFooter);
      if((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) || $window.innerWidth<768 ){
            if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }
            else{
                angular.element(e.currentTarget).addClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','dropdown');
                angular.element(e.currentTarget).parents('ul').children().removeClass('open');
                angular.element(e.currentTarget).parent('li').addClass('open');

            }

            
             
       }
       else{
            if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }
            console.log(angular.element(e.currentTarget).parent('li'));              
            angular.element(e.currentTarget).parents('ul').children().removeClass('active');
            angular.element(e.currentTarget).parent('li').addClass('active');
            $scope.isCollapsed = true;
           
           $scope.isCollaps = !$scope.isCollaps;
          
      }
    };
    $scope.secondMenu = function(e){
        console.log($scope.showFooter);
        if((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) || $window.innerWidth<768 ){
            
            if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }
            else{
              angular.element(e.currentTarget).addClass('dropdown-toggle');
              angular.element(e.currentTarget).attr('data-toggle','dropdown');
             angular.element(e.currentTarget).parents('ul').children().removeClass('open');
             angular.element(e.currentTarget).parent('li').addClass('open');
            }  
           
       }
       else{
             if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }

            angular.element(e.currentTarget).parents('ul').children().removeClass('active');
            angular.element(e.currentTarget).parent('li').toggleClass('active');
            $scope.isCollaps = true;
             $scope.isCollapsed = !$scope.isCollapsed;
            
        }
    };
    $scope.firstMenuEmpty = function(e){
        console.log($scope.showFooter);
         if((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) || $window.innerWidth<768 ){
            
             if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }
            else{
                angular.element(e.currentTarget).addClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','dropdown');
                angular.element(e.currentTarget).parents('ul').children().removeClass('open');
                 
                 angular.element(e.currentTarget).parent('li').addClass('open');

            }
            
           
       }
       else{
            if(angular.element(e.currentTarget).hasClass('dropdown-toggle')){
                angular.element(e.currentTarget).removeClass('dropdown-toggle');
                angular.element(e.currentTarget).attr('data-toggle','');
                angular.element(e.currentTarget).parent('li').removeClass('open');
            }

            angular.element(e.currentTarget).parents('ul').children().removeClass('active');
            angular.element(e.currentTarget).parent('li').toggleClass('active');
            $scope.isCollapsed = true;
            $scope.isCollaps = true;
        }
    };
    $scope.closeMenu = function(e){
      console.log($scope.showFooter);

        angular.element(e.currentTarget).parents('ul').children().removeClass('open');
       angular.element(e.currentTarget).parents('ul').children().removeClass('active');
       $scope.showFooter = false;
        $scope.isCollapsed = true;
        $scope.isCollaps = true;
    };

  }];
},{}],9:[function(require,module,exports){
'use strict';

angular.module('cpo')

    .run(
      [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        }
      ]
    )

	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider){

      // For any unmatched url, send to home
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('dealer', {
            url: '/dealer',
            templateUrl: 'views/dealer.html',
            controller: 'HomeController'
        })
        ;        

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: true
        });
    }])

  ;
},{}]},{},[1]);
