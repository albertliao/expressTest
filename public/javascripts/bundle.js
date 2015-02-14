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
	'ngTouch',
	'ui.router',
	'ui.bootstrap'
	])
	
 	;

require('./homepage');   
require('./navbar'); 
require('./footer'); 
// require('./benifits'); 
// require('./kiacareservice');

require('./routes');


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

	.controller('FooterController', require('./footerController'))

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

module.exports = /*@ngInject*/ ['$scope', '$rootScope', '$window', function($scope,$rootScope,$window) {

    $scope.slideInterval = 2500;
    $scope.desktopView =  false;
    $scope.tabletView = false;
    $scope.prvBtn = 'inactive';
    $scope.nextBtn = 'active';
    $scope.promos = '';
    console.log($scope.promos);
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

        $rootScope.$broadcast('$locationChangeSuccess');
        }
      ]
    )

	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider){
      
      $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.hbs',
            controller: 'HomeController'
        })
        .state('dealer', {
            url: '/dealer',
            templateUrl: 'partials/dealer.hbs',
            controller: 'FooterController'
        })
        .state('benifits', {
            url: '/benifits',
            templateUrl: 'partials/benifits.hbs',
            controller: 'FooterController'
        })
        .state('kiacareservice',{
           url: '/kiacareservice',
           templateUrl: 'partials/kiacareservice.hbs',
            controller: 'FooterController'
        })
        ;        

      // For any unmatched url, send to home
      $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode({
          enabled: true
        });
    }])

  ;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLnRtcC9zY3JpcHRzL2FwcC5qcyIsIi50bXAvc2NyaXB0cy9mb290ZXIvZm9vdGVyQ29udHJvbGxlci5qcyIsIi50bXAvc2NyaXB0cy9mb290ZXIvaW5kZXguanMiLCIudG1wL3NjcmlwdHMvaG9tZXBhZ2UvZGlzYWJsZU5nQW5pbWF0ZURpcmVjdGl2ZS5qcyIsIi50bXAvc2NyaXB0cy9ob21lcGFnZS9ob21lQ29udHJvbGxlci5qcyIsIi50bXAvc2NyaXB0cy9ob21lcGFnZS9pbmRleC5qcyIsIi50bXAvc2NyaXB0cy9uYXZiYXIvaW5kZXguanMiLCIudG1wL3NjcmlwdHMvbmF2YmFyL25hdkJhckNvbnRyb2xsZXIuanMiLCIudG1wL3NjcmlwdHMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ2RvYyBvdmVydmlld1xuICogQG5hbWUga2lhY3BvQXBwXG4gKiBAZGVzY3JpcHRpb25cbiAqICMga2lhY3BvQXBwXG4gKlxuICogTWFpbiBtb2R1bGUgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5hbmd1bGFyXG5cdC5tb2R1bGUoJ2NwbycsIFtcblx0Ly8gJ25nQW5pbWF0ZScsXG5cdC8vICduZ0Nvb2tpZXMnLFxuXHQvLyAnbmdSZXNvdXJjZScsXG5cdC8vICduZ1Nhbml0aXplJyxcblx0J25nVG91Y2gnLFxuXHQndWkucm91dGVyJyxcblx0J3VpLmJvb3RzdHJhcCdcblx0XSlcblx0XG4gXHQ7XG5cbnJlcXVpcmUoJy4vaG9tZXBhZ2UnKTsgICBcbnJlcXVpcmUoJy4vbmF2YmFyJyk7IFxucmVxdWlyZSgnLi9mb290ZXInKTsgXG4vLyByZXF1aXJlKCcuL2JlbmlmaXRzJyk7IFxuLy8gcmVxdWlyZSgnLi9raWFjYXJlc2VydmljZScpO1xuXG5yZXF1aXJlKCcuL3JvdXRlcycpO1xuXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IC8qQG5nSW5qZWN0Ki8gWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcblx0JHNjb3BlLnRlc3QgPSAndGVzdCc7XHJcblxyXG4vLyBcdCAgJGh0dHAoeydtZXRob2QnOidHRVQnLCd1cmwnOidkYXRhL25hdkRhdGEuanNvbid9KS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuLy8gXHRjb25zb2xlLmxvZygncmVzcCcscmVzcG9uc2UucHJlb3duZWRjZXJ0aWZpZWRsb2dvMSk7XHJcbi8vIFx0ICAgICRzY29wZS5kYXRhPXJlc3BvbnNlO1xyXG4vLyBcdCAgICAkc2NvcGUuaGVkZXJzTDE9cmVzcG9uc2UuaGVhZG5hdkwxO1xyXG4vLyBcdCAgICAkc2NvcGUuaGVkZXJzTDI9cmVzcG9uc2UuaGVhZG5hdkwyO1xyXG4vLyBcdCAgICAkc2NvcGUuc2lkZU5hdj1yZXNwb25zZS5zaWRlTmF2O1xyXG4vLyBcdCAgICAkc2NvcGUuZmVhdHVyZUxpc3Q9cmVzcG9uc2UuZmVhdHVyZUxpc3Q7XHJcbi8vIFx0ICB9KTtcclxuXHJcbiAgfV07IiwiJ3VzZSBzdHJpY3QnO1xyXG5hbmd1bGFyLm1vZHVsZSgnY3BvJylcclxuXHJcblx0LmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2Zvb3RlckNvbnRyb2xsZXInKSlcclxuXHJcblx0OyIsIid1c2Ugc3RyaWN0JztcclxuIFxyXG4vL2hlbHBlciBkaXJlY3RpdmUgdG8gZml4IG5nQW5pbWF0ZSBpc3N1ZSB3aXRoIGJvb3RzdHJhcCBjYXJvdXNlbDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvYm9vdHN0cmFwL2lzc3Vlcy8xMzUwXHJcbm1vZHVsZS5leHBvcnRzID0gLypAbmdJbmplY3QqLyBbJyRhbmltYXRlJywgZnVuY3Rpb24oJGFuaW1hdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbn1dOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAvKkBuZ0luamVjdCovIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHdpbmRvdycsIGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCR3aW5kb3cpIHtcblxuICAgICRzY29wZS5zbGlkZUludGVydmFsID0gMjUwMDtcbiAgICAkc2NvcGUuZGVza3RvcFZpZXcgPSAgZmFsc2U7XG4gICAgJHNjb3BlLnRhYmxldFZpZXcgPSBmYWxzZTtcbiAgICAkc2NvcGUucHJ2QnRuID0gJ2luYWN0aXZlJztcbiAgICAkc2NvcGUubmV4dEJ0biA9ICdhY3RpdmUnO1xuICAgICRzY29wZS5wcm9tb3MgPSAnJztcbiAgICBjb25zb2xlLmxvZygkc2NvcGUucHJvbW9zKTtcbiAgICAkc2NvcGUuc2VsZWN0aW9uID0gJ2RlZmF1bHQnO1xuICAgICRzY29wZS5zbGlkZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGltYWdlOiAnaW1hZ2VzL2NhcjEucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpbWFnZTogJ2ltYWdlcy9jYXIyLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaW1hZ2U6ICdpbWFnZXMvY2FyMy5wbmcnXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgJHNjb3BlLnN0YXR1cyA9ICdyZWFkeSc7XG5cbiAgICBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmRlY2lkZVZpZXdzKCk7XG4gICAgfSk7XG4gICAgJHNjb3BlLmRlY2lkZVZpZXdzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgIGlmKCR3aW5kb3cuaW5uZXJXaWR0aD49MTAyNCl7XG4gICAgICAgICAgICAkc2NvcGUuZGVza3RvcFZpZXcgPSB0cnVlOyBcbiAgICAgICAgICAgICRzY29wZS50YWJsZXRWaWV3ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZigkd2luZG93LmlubmVyV2lkdGg8MTAyNCl7XG4gICAgICAgICAgICAkc2NvcGUudGFibGV0VmlldyA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuZGVza3RvcFZpZXcgPSAgZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoJHdpbmRvdy5pbm5lcldpZHRoPDc2Nyl7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcubWVudUJhbm5lci1saW5rJykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgYXQgaG9tZSBjb250cm9sbGVyJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5tZW51QmFubmVyLWxpbmsnKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKS5hZGRDbGFzcygnZHJvcGRvd24tbWVudScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCR3aW5kb3cuaW5uZXJXaWR0aD49NzY4KXtcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudCgnLm1lbnVCYW5uZXItbGluaycpLnBhcmVudCgnbGknKS5oYXNDbGFzcygnb3BlbicpKXtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5tZW51QmFubmVyLWxpbmsnKS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudCgnLm1lbnVCYW5uZXItbGluaycpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmhhc0NsYXNzKCdkcm9wZG93bi1tZW51Jykpe1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1lbnVCYW5uZXItbGluaycpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi1tZW51Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgICAgJHNjb3BlLmRlY2lkZVZpZXdzKCk7ICBcbiAgICAkc2NvcGUuc2hvd0V4cGxvcmVNZW51ID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCR3aW5kb3cuaW5uZXJXaWR0aDw3Njgpe1xuICAgICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLmhhc0NsYXNzKCdvcGVuJykpe1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgJHNjb3BlLnByZXZpb3VzQmFubmVyID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdpbmFjdGl2ZScpKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzYWJsZSBtb2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKCRzY29wZS5kZXNrdG9wVmlldyl7XG4gICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlbGVjdGlvbiA9PT0gJ3NlY29uZCcpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0aW9uID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubmV4dC1iYW5uZXInKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubmV4dC1iYW5uZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCRzY29wZS50YWJsZXRWaWV3KXtcbiAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0aW9uID09PSAnc2Vjb25kJyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCRzY29wZS5zZWxlY3Rpb24gPT09ICd0aGlyZCcpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0aW9uID0gJ3NlY29uZCc7XG4gICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV4dEJ0biA9ICdhY3RpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm5leHQtYmFubmVyJykucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm5leHQtYmFubmVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgJHNjb3BlLm5leHRCYW5uZXIgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2luYWN0aXZlJykpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNhYmxlIG1vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoJHNjb3BlLmRlc2t0b3BWaWV3KXtcbiAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0aW9uID09PSAnZGVmYXVsdCcpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0aW9uID0gJ3NlY29uZCc7XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcucHJldi1iYW5uZXInKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcucHJldi1iYW5uZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCRzY29wZS50YWJsZXRWaWV3KXtcbiAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0aW9uID09PSAnZGVmYXVsdCcpe1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0aW9uID0gJ3NlY29uZCc7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wcnZCdG4gPSAnYWN0aXZlJztcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5wcmV2LWJhbm5lcicpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5wcmV2LWJhbm5lcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZigkc2NvcGUuc2VsZWN0aW9uID09PSAnc2Vjb25kJyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAndGhpcmQnO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1dOyIsIid1c2Ugc3RyaWN0JztcclxuYW5ndWxhci5tb2R1bGUoJ2NwbycpXHJcbiBcclxuXHQuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2hvbWVDb250cm9sbGVyJykpXHJcbiBcdC5kaXJlY3RpdmUoJ2Rpc2FibGVOZ0FuaW1hdGUnLCByZXF1aXJlKCcuL2Rpc2FibGVOZ0FuaW1hdGVEaXJlY3RpdmUnKSlcdFxyXG5cclxuXHQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5hbmd1bGFyLm1vZHVsZSgnY3BvJykgXHJcblx0LmNvbnRyb2xsZXIoJ05hdkJhckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL25hdkJhckNvbnRyb2xsZXInKSlcclxuXHJcblx0OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gLypAbmdJbmplY3QqLyBbJyRzY29wZScsICckdGltZW91dCcsICckd2luZG93JywgZnVuY3Rpb24oJHNjb3BlLCR0aW1lb3V0LCR3aW5kb3cpe1xyXG5cclxuXHJcblxyXG4gIC8vICAgJGh0dHAoeydtZXRob2QnOidHRVQnLCd1cmwnOidkYXRhL25hdkRhdGEuanNvbid9KS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKXsgICAgXHJcbiAgLy8gY29uc29sZS5sb2coJ3Jlc3AnLHJlc3BvbnNlLnByZW93bmVkY2VydGlmaWVkbG9nbzEpO1xyXG4gIC8vICAgICAkc2NvcGUuZGF0YT1yZXNwb25zZTtcclxuICAvLyAgICAgJHNjb3BlLmhlZGVyc0wxPXJlc3BvbnNlLmhlYWRuYXZMMTtcclxuICAvLyAgICAgJHNjb3BlLmhlZGVyc0wyPXJlc3BvbnNlLmhlYWRuYXZMMjtcclxuICAvLyAgICAgJHNjb3BlLnNpZGVOYXY9cmVzcG9uc2Uuc2lkZU5hdjtcclxuICAvLyAgICAgJHNjb3BlLmZlYXR1cmVMaXN0PXJlc3BvbnNlLmZlYXR1cmVMaXN0O1xyXG4gIC8vICAgfSk7XHJcblxyXG4gICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICRzY29wZS5pc0NvbGxhcHMgPSB0cnVlO1xyXG4gICAgJHNjb3BlLmlzU2VhcmNoID0gdHJ1ZTtcclxuICAgICRzY29wZS5zaG93Rm9vdGVyID0gZmFsc2U7XHJcblxyXG4gICAgJHNjb3BlLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLm5hdkFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICRzY29wZS5raWFMb2dvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2sgdG8ga2lhLmNvbScpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdykuYmluZCgncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZigkd2luZG93LmlubmVyV2lkdGg+PTc2OCl7XHJcbiAgICAgICAgICAkc2NvcGUuc2hvd0Zvb3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcuZHJvcGRvd24tdG9nZ2xlJykpe1xyXG4gICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmRyb3Bkb3duLXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudCgnLm9wZW4nKSl7XHJcbiAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgJHNjb3BlLmlzU2VhcmNoID0gISRzY29wZS5pc1NlYXJjaDtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLnNlYXJjaC1kaXYnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgaWYoJHdpbmRvdy5pbm5lcldpZHRoPDc2OCl7XHJcbiAgICAgICAgICAgICAgaWYoJHNjb3BlLm5hdkFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduYXYgYnV0dG9uIGlzIGFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS5zaG93Rm9vdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgJHNjb3BlLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLnNlYXJjaC1kaXYnKS5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICBpZigkd2luZG93LmlubmVyV2lkdGg8NzY4KXtcclxuICAgICAgICAgICAgICAkc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgICAgJHNjb3BlLnNlYXJjaEFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICBcclxuICAgIH07XHJcbiAgIFxyXG4gICAgJHNjb3BlLmhvbWVMaW5rID0gIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25hdmlnYXRlICB0byBob21lLmh0bWwnKTtcclxuICAgIH07XHJcbiAgICAgJHNjb3BlLnNob3dNb2JpZU1lbnUgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcjYnMtZXhhbXBsZS1uYXZiYXItY29sbGFwc2UtMScpLmhhc0NsYXNzKCdpbicpKXtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5tZW51LWljb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlLWljb24nKTtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyNicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xJykucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWFyY2hBY3RpdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXJhY2ggYnV0dG9uIGlzIGFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd0Zvb3RlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICRzY29wZS5uYXZBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1lbnUtaWNvbicpLmFkZENsYXNzKCdhY3RpdmUtaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcjYnMtZXhhbXBsZS1uYXZiYXItY29sbGFwc2UtMScpLmFkZENsYXNzKCdpbicpO1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS5zaG93Rm9vdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAkc2NvcGUubmF2QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgIH07IFxyXG4gICAgXHJcbiAgICAkc2NvcGUuc2hvd1JlZCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnZGl2LnNlYXJjaEJveCcpLmZpbmQoJ2knKS5hZGRDbGFzcygncmVkJyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmhpZGVSZWQgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2Rpdi5zZWFyY2hCb3gnKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoJ3JlZCcpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5maXJzdE1lbnUgPSBmdW5jdGlvbihlKXtcclxuICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dGb290ZXIpO1xyXG4gICAgICBpZigoL2FuZHJvaWR8d2Vib3N8aXBob25lfGlwYWR8aXBvZHxibGFja2JlcnJ5fGllbW9iaWxlfG9wZXJhIG1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkpIHx8ICR3aW5kb3cuaW5uZXJXaWR0aDw3NjggKXtcclxuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpKXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCdkcm9wZG93bicpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50cygndWwnKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICB9XHJcbiAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnZHJvcGRvd24tdG9nZ2xlJykpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCcnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKSk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50cygndWwnKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzID0gISRzY29wZS5pc0NvbGxhcHM7XHJcbiAgICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgICRzY29wZS5zZWNvbmRNZW51ID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dGb290ZXIpO1xyXG4gICAgICAgIGlmKCgvYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBhZHxpcG9kfGJsYWNrYmVycnl8aWVtb2JpbGV8b3BlcmEgbWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkgfHwgJHdpbmRvdy5pbm5lcldpZHRoPDc2OCApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpKXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmFkZENsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJ2Ryb3Bkb3duJyk7XHJcbiAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgICBcclxuICAgICAgIH1cclxuICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnZHJvcGRvd24tdG9nZ2xlJykpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCcnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9ICEkc2NvcGUuaXNDb2xsYXBzZWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAkc2NvcGUuZmlyc3RNZW51RW1wdHkgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0Zvb3Rlcik7XHJcbiAgICAgICAgIGlmKCgvYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBhZHxpcG9kfGJsYWNrYmVycnl8aWVtb2JpbGV8b3BlcmEgbWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkgfHwgJHdpbmRvdy5pbm5lcldpZHRoPDc2OCApe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdkcm9wZG93bi10b2dnbGUnKSl7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnZHJvcGRvd24tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJycpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmFkZENsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJ3VsJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBcclxuICAgICAgIH1cclxuICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdkcm9wZG93bi10b2dnbGUnKSl7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnZHJvcGRvd24tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJycpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJ3VsJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAkc2NvcGUuY2xvc2VNZW51ID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Rm9vdGVyKTtcclxuXHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50cygndWwnKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgJHNjb3BlLnNob3dGb290ZXIgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgICRzY29wZS5pc0NvbGxhcHMgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgfV07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NwbycpXHJcblxyXG4gICAgLnJ1bihcclxuICAgICAgWyAgICAgICAgICAnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJyxcclxuICAgICAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgICAkc3RhdGUsICAgJHN0YXRlUGFyYW1zKSB7XHJcblxyXG4gICAgICAgIC8vIEl0J3MgdmVyeSBoYW5keSB0byBhZGQgcmVmZXJlbmNlcyB0byAkc3RhdGUgYW5kICRzdGF0ZVBhcmFtcyB0byB0aGUgJHJvb3RTY29wZVxyXG4gICAgICAgIC8vIHNvIHRoYXQgeW91IGNhbiBhY2Nlc3MgdGhlbSBmcm9tIGFueSBzY29wZSB3aXRoaW4geW91ciBhcHBsaWNhdGlvbnMuRm9yIGV4YW1wbGUsXHJcbiAgICAgICAgLy8gPGxpIG5nLWNsYXNzPVwieyBhY3RpdmU6ICRzdGF0ZS5pbmNsdWRlcygnY29udGFjdHMubGlzdCcpIH1cIj4gd2lsbCBzZXQgdGhlIDxsaT5cclxuICAgICAgICAvLyB0byBhY3RpdmUgd2hlbmV2ZXIgJ2NvbnRhY3RzLmxpc3QnIG9yIG9uZSBvZiBpdHMgZGVjZW5kZW50cyBpcyBhY3RpdmUuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuXHQuY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCAnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG4gICAgICBcclxuICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2hvbWUuaGJzJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdkZWFsZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kZWFsZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2RlYWxlci5oYnMnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRm9vdGVyQ29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYmVuaWZpdHMnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9iZW5pZml0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvYmVuaWZpdHMuaGJzJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckNvbnRyb2xsZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2tpYWNhcmVzZXJ2aWNlJyx7XHJcbiAgICAgICAgICAgdXJsOiAnL2tpYWNhcmVzZXJ2aWNlJyxcclxuICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2tpYWNhcmVzZXJ2aWNlLmhicycsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb290ZXJDb250cm9sbGVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgOyAgICAgICAgXHJcblxyXG4gICAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmwsIHNlbmQgdG8gaG9tZVxyXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XSlcclxuXHJcbiAgOyJdfQ==
