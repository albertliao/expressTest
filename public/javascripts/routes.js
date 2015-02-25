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

	.config(function($locationProvider, $stateProvider, $urlRouterProvider){
      
      $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.hbs',
            controller: 'HomeController'
        })
        .state('dealer', {
            url: '/dealer',
            templateUrl: 'partials/dealer.hbs',
            controller: 'DealerController'
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
    })

  ;