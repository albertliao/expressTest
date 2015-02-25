'use strict';

module.exports = /*@ngInject*/ function($scope,$rootScope,$window) {

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
};