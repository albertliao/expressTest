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

module.exports = /*@ngInject*/ ['$scope', '$window', function($scope,$window) {

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
            templateUrl: 'partials/dealer.hbs'
            // controller: 'HomeController'
        })
        .state('benifits', {
            url: '/benifits',
            templateUrl: 'partials/benifits.hbs'
            // controller: 'BenifitsController'
        })
        .state('kiacareservice',{
           url: '/kiacareservice',
           templateUrl: 'partials/kiacareservice.hbs'
           // controller: 'KiacareserviceController'
        })
        ;        

      // For any unmatched url, send to home
      $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: true
        });
    }])

  ;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLnRtcC9zY3JpcHRzL2FwcC5qcyIsIi50bXAvc2NyaXB0cy9mb290ZXIvZm9vdGVyQ29udHJvbGxlci5qcyIsIi50bXAvc2NyaXB0cy9mb290ZXIvaW5kZXguanMiLCIudG1wL3NjcmlwdHMvaG9tZXBhZ2UvZGlzYWJsZU5nQW5pbWF0ZURpcmVjdGl2ZS5qcyIsIi50bXAvc2NyaXB0cy9ob21lcGFnZS9ob21lQ29udHJvbGxlci5qcyIsIi50bXAvc2NyaXB0cy9ob21lcGFnZS9pbmRleC5qcyIsIi50bXAvc2NyaXB0cy9uYXZiYXIvaW5kZXguanMiLCIudG1wL3NjcmlwdHMvbmF2YmFyL25hdkJhckNvbnRyb2xsZXIuanMiLCIudG1wL3NjcmlwdHMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nZG9jIG92ZXJ2aWV3XG4gKiBAbmFtZSBraWFjcG9BcHBcbiAqIEBkZXNjcmlwdGlvblxuICogIyBraWFjcG9BcHBcbiAqXG4gKiBNYWluIG1vZHVsZSBvZiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY3BvJywgW1xuICAgIC8vICduZ0FuaW1hdGUnLFxuICAgIC8vICduZ0Nvb2tpZXMnLFxuICAgIC8vICduZ1Jlc291cmNlJyxcbiAgICAvLyAnbmdTYW5pdGl6ZScsXG4gICAgLy8gJ25nVG91Y2gnLFxuICAgICd1aS5yb3V0ZXInLFxuICAgICd1aS5ib290c3RyYXAnXG4gIF0pO1xuXG5yZXF1aXJlKCcuL2hvbWVwYWdlJyk7ICAgXG5yZXF1aXJlKCcuL25hdmJhcicpOyBcbnJlcXVpcmUoJy4vZm9vdGVyJyk7IFxuLy8gcmVxdWlyZSgnLi9iZW5pZml0cycpOyBcbi8vIHJlcXVpcmUoJy4va2lhY2FyZXNlcnZpY2UnKTtcblxucmVxdWlyZSgnLi9yb3V0ZXMnKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IC8qQG5nSW5qZWN0Ki8gWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcblx0JHNjb3BlLnRlc3QgPSAndGVzdCc7XHJcblxyXG4vLyBcdCAgJGh0dHAoeydtZXRob2QnOidHRVQnLCd1cmwnOidkYXRhL25hdkRhdGEuanNvbid9KS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuLy8gXHRjb25zb2xlLmxvZygncmVzcCcscmVzcG9uc2UucHJlb3duZWRjZXJ0aWZpZWRsb2dvMSk7XHJcbi8vIFx0ICAgICRzY29wZS5kYXRhPXJlc3BvbnNlO1xyXG4vLyBcdCAgICAkc2NvcGUuaGVkZXJzTDE9cmVzcG9uc2UuaGVhZG5hdkwxO1xyXG4vLyBcdCAgICAkc2NvcGUuaGVkZXJzTDI9cmVzcG9uc2UuaGVhZG5hdkwyO1xyXG4vLyBcdCAgICAkc2NvcGUuc2lkZU5hdj1yZXNwb25zZS5zaWRlTmF2O1xyXG4vLyBcdCAgICAkc2NvcGUuZmVhdHVyZUxpc3Q9cmVzcG9uc2UuZmVhdHVyZUxpc3Q7XHJcbi8vIFx0ICB9KTtcclxuXHJcbiAgfV07IiwiJ3VzZSBzdHJpY3QnO1xyXG5hbmd1bGFyLm1vZHVsZSgnY3BvJylcclxuXHJcblx0LmNvbnRyb2xsZXIoJ0Zvb3RlckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2Zvb3RlckNvbnRyb2xsZXInKSlcclxuXHJcblx0OyIsIid1c2Ugc3RyaWN0JztcclxuIFxyXG4vL2hlbHBlciBkaXJlY3RpdmUgdG8gZml4IG5nQW5pbWF0ZSBpc3N1ZSB3aXRoIGJvb3RzdHJhcCBjYXJvdXNlbDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvYm9vdHN0cmFwL2lzc3Vlcy8xMzUwXHJcbm1vZHVsZS5leHBvcnRzID0gLypAbmdJbmplY3QqLyBbJyRhbmltYXRlJywgZnVuY3Rpb24oJGFuaW1hdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgJGFuaW1hdGUuZW5hYmxlZChmYWxzZSwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbn1dOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAvKkBuZ0luamVjdCovIFsnJHNjb3BlJywgJyR3aW5kb3cnLCBmdW5jdGlvbigkc2NvcGUsJHdpbmRvdykge1xuXG4gICAgJHNjb3BlLnNsaWRlSW50ZXJ2YWwgPSAyNTAwO1xuICAgICRzY29wZS5kZXNrdG9wVmlldyA9ICBmYWxzZTtcbiAgICAkc2NvcGUudGFibGV0VmlldyA9IGZhbHNlO1xuICAgICRzY29wZS5wcnZCdG4gPSAnaW5hY3RpdmUnO1xuICAgICRzY29wZS5uZXh0QnRuID0gJ2FjdGl2ZSc7XG4gICAgJHNjb3BlLnByb21vcyA9ICcnO1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5wcm9tb3MpO1xuICAgICRzY29wZS5zZWxlY3Rpb24gPSAnZGVmYXVsdCc7XG4gICAgJHNjb3BlLnNsaWRlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaW1hZ2U6ICdpbWFnZXMvY2FyMS5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGltYWdlOiAnaW1hZ2VzL2NhcjIucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpbWFnZTogJ2ltYWdlcy9jYXIzLnBuZydcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAkc2NvcGUuc3RhdHVzID0gJ3JlYWR5JztcblxuICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUuZGVjaWRlVmlld3MoKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuZGVjaWRlVmlld3MgPSBmdW5jdGlvbigpe1xuICAgICAgICAgaWYoJHdpbmRvdy5pbm5lcldpZHRoPj0xMDI0KXtcbiAgICAgICAgICAgICRzY29wZS5kZXNrdG9wVmlldyA9IHRydWU7IFxuICAgICAgICAgICAgJHNjb3BlLnRhYmxldFZpZXcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCR3aW5kb3cuaW5uZXJXaWR0aDwxMDI0KXtcbiAgICAgICAgICAgICRzY29wZS50YWJsZXRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5kZXNrdG9wVmlldyA9ICBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZigkd2luZG93LmlubmVyV2lkdGg8NzY3KXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJy5tZW51QmFubmVyLWxpbmsnKS5wYXJlbnQoJ2xpJykuZmluZCgndWwnKS5oYXNDbGFzcygnZHJvcGRvd24tbWVudScpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBhdCBob21lIGNvbnRyb2xsZXInKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1lbnVCYW5uZXItbGluaycpLnBhcmVudCgnbGknKS5maW5kKCd1bCcpLmFkZENsYXNzKCdkcm9wZG93bi1tZW51Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoJHdpbmRvdy5pbm5lcldpZHRoPj03Njgpe1xuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcubWVudUJhbm5lci1saW5rJykucGFyZW50KCdsaScpLmhhc0NsYXNzKCdvcGVuJykpe1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1lbnVCYW5uZXItbGluaycpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcubWVudUJhbm5lci1saW5rJykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykuaGFzQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKSl7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubWVudUJhbm5lci1saW5rJykucGFyZW50KCdsaScpLmZpbmQoJ3VsJykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgICAkc2NvcGUuZGVjaWRlVmlld3MoKTsgIFxuICAgICRzY29wZS5zaG93RXhwbG9yZU1lbnUgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoJHdpbmRvdy5pbm5lcldpZHRoPDc2OCl7XG4gICAgICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ29wZW4nKSl7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkc2NvcGUucHJldmlvdXNCYW5uZXIgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2luYWN0aXZlJykpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNhYmxlIG1vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoJHNjb3BlLmRlc2t0b3BWaWV3KXtcbiAgICAgICAgICAgICAgICBpZigkc2NvcGUuc2VsZWN0aW9uID09PSAnc2Vjb25kJyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5uZXh0LWJhbm5lcicpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5uZXh0LWJhbm5lcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJHNjb3BlLnRhYmxldFZpZXcpe1xuICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3Rpb24gPT09ICdzZWNvbmQnKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGlvbiA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoJHNjb3BlLnNlbGVjdGlvbiA9PT0gJ3RoaXJkJyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAnc2Vjb25kJztcbiAgICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXh0QnRuID0gJ2FjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubmV4dC1iYW5uZXInKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubmV4dC1iYW5uZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAkc2NvcGUubmV4dEJhbm5lciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnaW5hY3RpdmUnKSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2FibGUgbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZigkc2NvcGUuZGVza3RvcFZpZXcpe1xuICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3Rpb24gPT09ICdkZWZhdWx0Jyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAnc2Vjb25kJztcblxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5wcmV2LWJhbm5lcicpLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5wcmV2LWJhbm5lcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hZGRDbGFzcygnaW5hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoJHNjb3BlLnRhYmxldFZpZXcpe1xuICAgICAgICAgICAgICAgIGlmKCRzY29wZS5zZWxlY3Rpb24gPT09ICdkZWZhdWx0Jyl7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3Rpb24gPSAnc2Vjb25kJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBydkJ0biA9ICdhY3RpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLnByZXYtYmFubmVyJykucmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLnByZXYtYmFubmVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKCRzY29wZS5zZWxlY3Rpb24gPT09ICdzZWNvbmQnKXtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGlvbiA9ICd0aGlyZCc7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufV07IiwiJ3VzZSBzdHJpY3QnO1xyXG5hbmd1bGFyLm1vZHVsZSgnY3BvJylcclxuIFxyXG5cdC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vaG9tZUNvbnRyb2xsZXInKSlcclxuIFx0LmRpcmVjdGl2ZSgnZGlzYWJsZU5nQW5pbWF0ZScsIHJlcXVpcmUoJy4vZGlzYWJsZU5nQW5pbWF0ZURpcmVjdGl2ZScpKVx0XHJcblxyXG5cdDsiLCIndXNlIHN0cmljdCc7XHJcbmFuZ3VsYXIubW9kdWxlKCdjcG8nKSBcclxuXHQuY29udHJvbGxlcignTmF2QmFyQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vbmF2QmFyQ29udHJvbGxlcicpKVxyXG5cclxuXHQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAvKkBuZ0luamVjdCovIFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJyR3aW5kb3cnLCBmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJHdpbmRvdyl7XHJcblxyXG5cclxuXHJcbiAgLy8gICAkaHR0cCh7J21ldGhvZCc6J0dFVCcsJ3VybCc6J2RhdGEvbmF2RGF0YS5qc29uJ30pLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpeyAgICBcclxuICAvLyBjb25zb2xlLmxvZygncmVzcCcscmVzcG9uc2UucHJlb3duZWRjZXJ0aWZpZWRsb2dvMSk7XHJcbiAgLy8gICAgICRzY29wZS5kYXRhPXJlc3BvbnNlO1xyXG4gIC8vICAgICAkc2NvcGUuaGVkZXJzTDE9cmVzcG9uc2UuaGVhZG5hdkwxO1xyXG4gIC8vICAgICAkc2NvcGUuaGVkZXJzTDI9cmVzcG9uc2UuaGVhZG5hdkwyO1xyXG4gIC8vICAgICAkc2NvcGUuc2lkZU5hdj1yZXNwb25zZS5zaWRlTmF2O1xyXG4gIC8vICAgICAkc2NvcGUuZmVhdHVyZUxpc3Q9cmVzcG9uc2UuZmVhdHVyZUxpc3Q7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSB0cnVlO1xyXG4gICAgJHNjb3BlLmlzQ29sbGFwcyA9IHRydWU7XHJcbiAgICAkc2NvcGUuaXNTZWFyY2ggPSB0cnVlO1xyXG4gICAgJHNjb3BlLnNob3dGb290ZXIgPSBmYWxzZTtcclxuXHJcbiAgICAkc2NvcGUuc2VhcmNoQWN0aXZlID0gZmFsc2U7XHJcbiAgICAkc2NvcGUubmF2QWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgJHNjb3BlLmtpYUxvZ28gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljayB0byBraWEuY29tJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmKCR3aW5kb3cuaW5uZXJXaWR0aD49NzY4KXtcclxuICAgICAgICAgICRzY29wZS5zaG93Rm9vdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJy5kcm9wZG93bi10b2dnbGUnKSl7XHJcbiAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcuZHJvcGRvd24tdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KCcub3BlbicpKXtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbihlKXtcclxuICAgICAgICAkc2NvcGUuaXNTZWFyY2ggPSAhJHNjb3BlLmlzU2VhcmNoO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ3NlbGVjdGVkJykpe1xyXG4gICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcuc2VhcmNoLWRpdicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBpZigkd2luZG93LmlubmVyV2lkdGg8NzY4KXtcclxuICAgICAgICAgICAgICBpZigkc2NvcGUubmF2QWN0aXZlKXtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25hdiBidXR0b24gaXMgYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dGb290ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcuc2VhcmNoLWRpdicpLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgIGlmKCR3aW5kb3cuaW5uZXJXaWR0aDw3Njgpe1xyXG4gICAgICAgICAgICAgICRzY29wZS5zaG93Rm9vdGVyID0gdHJ1ZTtcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgICAkc2NvcGUuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfTtcclxuICAgXHJcbiAgICAkc2NvcGUuaG9tZUxpbmsgPSAgZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnbmF2aWdhdGUgIHRvIGhvbWUuaHRtbCcpO1xyXG4gICAgfTtcclxuICAgICAkc2NvcGUuc2hvd01vYmllTWVudSA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoJyNicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xJykuaGFzQ2xhc3MoJ2luJykpe1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1lbnUtaWNvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUtaWNvbicpO1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2JzLWV4YW1wbGUtbmF2YmFyLWNvbGxhcHNlLTEnKS5yZW1vdmVDbGFzcygnaW4nKTtcclxuICAgICAgICAgICAgICAgaWYoJHNjb3BlLnNlYXJjaEFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlcmFjaCBidXR0b24gaXMgYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICRzY29wZS5zaG93Rm9vdGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgJHNjb3BlLm5hdkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCcubWVudS1pY29uJykuYWRkQ2xhc3MoJ2FjdGl2ZS1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJyNicy1leGFtcGxlLW5hdmJhci1jb2xsYXBzZS0xJykuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS5uYXZBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgfTsgXHJcbiAgICBcclxuICAgICRzY29wZS5zaG93UmVkID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdkaXYuc2VhcmNoQm94JykuZmluZCgnaScpLmFkZENsYXNzKCdyZWQnKTtcclxuICAgIH07XHJcbiAgICAkc2NvcGUuaGlkZVJlZCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnZGl2LnNlYXJjaEJveCcpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygncmVkJyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmZpcnN0TWVudSA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0Zvb3Rlcik7XHJcbiAgICAgIGlmKCgvYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBhZHxpcG9kfGJsYWNrYmVycnl8aWVtb2JpbGV8b3BlcmEgbWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSkgfHwgJHdpbmRvdy5pbm5lcldpZHRoPDc2OCApe1xyXG4gICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnZHJvcGRvd24tdG9nZ2xlJykpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCcnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hZGRDbGFzcygnZHJvcGRvd24tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJ2Ryb3Bkb3duJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5hZGRDbGFzcygnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgIH1cclxuICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdkcm9wZG93bi10b2dnbGUnKSl7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnZHJvcGRvd24tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJycpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICRzY29wZS5pc0NvbGxhcHMgPSAhJHNjb3BlLmlzQ29sbGFwcztcclxuICAgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnNlY29uZE1lbnUgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0Zvb3Rlcik7XHJcbiAgICAgICAgaWYoKC9hbmRyb2lkfHdlYm9zfGlwaG9uZXxpcGFkfGlwb2R8YmxhY2tiZXJyeXxpZW1vYmlsZXxvcGVyYSBtaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSB8fCAkd2luZG93LmlubmVyV2lkdGg8NzY4ICl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnZHJvcGRvd24tdG9nZ2xlJykpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCcnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJ3VsJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgfVxyXG4gICAgICAgZWxzZXtcclxuICAgICAgICAgICAgIGlmKGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdkcm9wZG93bi10b2dnbGUnKSl7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5yZW1vdmVDbGFzcygnZHJvcGRvd24tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXRvZ2dsZScsJycpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJ3VsJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnbGknKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gISRzY29wZS5pc0NvbGxhcHNlZDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICRzY29wZS5maXJzdE1lbnVFbXB0eSA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Rm9vdGVyKTtcclxuICAgICAgICAgaWYoKC9hbmRyb2lkfHdlYm9zfGlwaG9uZXxpcGFkfGlwb2R8YmxhY2tiZXJyeXxpZW1vYmlsZXxvcGVyYSBtaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSB8fCAkd2luZG93LmlubmVyV2lkdGg8NzY4ICl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpKXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYWRkQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS10b2dnbGUnLCdkcm9wZG93bicpO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50cygndWwnKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLmFkZENsYXNzKCdvcGVuJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgfVxyXG4gICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2Ryb3Bkb3duLXRvZ2dsZScpKXtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtdG9nZ2xlJywnJyk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoJ2xpJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50cygndWwnKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGUuY3VycmVudFRhcmdldCkucGFyZW50KCdsaScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwcyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICRzY29wZS5jbG9zZU1lbnUgPSBmdW5jdGlvbihlKXtcclxuICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dGb290ZXIpO1xyXG5cclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd1bCcpLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgIGFuZ3VsYXIuZWxlbWVudChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJ3VsJykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAkc2NvcGUuc2hvd0Zvb3RlciA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgJHNjb3BlLmlzQ29sbGFwcyA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICB9XTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY3BvJylcclxuXHJcbiAgICAucnVuKFxyXG4gICAgICBbICAgICAgICAgICckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAgICRzdGF0ZSwgICAkc3RhdGVQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgLy8gSXQncyB2ZXJ5IGhhbmR5IHRvIGFkZCByZWZlcmVuY2VzIHRvICRzdGF0ZSBhbmQgJHN0YXRlUGFyYW1zIHRvIHRoZSAkcm9vdFNjb3BlXHJcbiAgICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIGFjY2VzcyB0aGVtIGZyb20gYW55IHNjb3BlIHdpdGhpbiB5b3VyIGFwcGxpY2F0aW9ucy5Gb3IgZXhhbXBsZSxcclxuICAgICAgICAvLyA8bGkgbmctY2xhc3M9XCJ7IGFjdGl2ZTogJHN0YXRlLmluY2x1ZGVzKCdjb250YWN0cy5saXN0JykgfVwiPiB3aWxsIHNldCB0aGUgPGxpPlxyXG4gICAgICAgIC8vIHRvIGFjdGl2ZSB3aGVuZXZlciAnY29udGFjdHMubGlzdCcgb3Igb25lIG9mIGl0cyBkZWNlbmRlbnRzIGlzIGFjdGl2ZS5cclxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIClcclxuXHJcblx0LmNvbmZpZyhbJyRsb2NhdGlvblByb3ZpZGVyJywgJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcclxuICAgICAgXHJcbiAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ob21lLmhicycsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZGVhbGVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZGVhbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9kZWFsZXIuaGJzJ1xyXG4gICAgICAgICAgICAvLyBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2JlbmlmaXRzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYmVuaWZpdHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2JlbmlmaXRzLmhicydcclxuICAgICAgICAgICAgLy8gY29udHJvbGxlcjogJ0JlbmlmaXRzQ29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgna2lhY2FyZXNlcnZpY2UnLHtcclxuICAgICAgICAgICB1cmw6ICcva2lhY2FyZXNlcnZpY2UnLFxyXG4gICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMva2lhY2FyZXNlcnZpY2UuaGJzJ1xyXG4gICAgICAgICAgIC8vIGNvbnRyb2xsZXI6ICdLaWFjYXJlc2VydmljZUNvbnRyb2xsZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICA7ICAgICAgICBcclxuXHJcbiAgICAgIC8vIEZvciBhbnkgdW5tYXRjaGVkIHVybCwgc2VuZCB0byBob21lXHJcbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICByZXF1aXJlQmFzZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfV0pXHJcblxyXG4gIDsiXX0=
