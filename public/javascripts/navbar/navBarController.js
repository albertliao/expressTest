'use strict';

module.exports = /*@ngInject*/ function($scope,$timeout,$window){



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

  };