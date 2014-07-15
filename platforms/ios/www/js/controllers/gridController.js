angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, Grid, GridTargetFactory) {
  $scope.navTitle = 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
var yo = new SoundBoard('piano', 120, [200, 300, 600, 350, 400]);
// yo.startClock();

// yo.playInterval([{}, {}, {}, {200:true, 400:true, 300:true, 600:true, 350:true}, {}, {}, {}, {400:true, 600:true}]);
yo.playInterval([{200:true}, {400:true}, {300:true}, {200:true}, {300:true}, {400:true}, {600:true}, {400:true}]);
yo.playSounds(200, 1, 0);

    // yo.startClock();
    

}

})
.controller('OneController', function ($scope) {
    $scope.navTitle = "Page One Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('TwoController', function ($scope) {
    $scope.navTitle = "Page Two Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('ThreeController', function ($scope) {
    $scope.navTitle = "Page Three Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
});
