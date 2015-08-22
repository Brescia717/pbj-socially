angular.module("socially").controller("PartyDetailsCtrl", function($scope, $stateParams, $meteor) {

  $scope.party = $meteor.object(Parties, $stateParams.partyId, false);

  var subscriptionHandle;
  $meteor.subscribe('parties').then(function(handle) {
    subscriptionHandle = handle;
  });

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  $scope.$on('$destroy', function() {
    subscriptionHandle.stop();
  });

  $scope.save = function() {
    $scope.party.save().then(function(numberOfDocs){
        console.log('save success doc affected ', numberOfDocs);
      }, function(error){
        console.log('save error', error);
      });
  };

  $scope.reset = function () {
    $scope.party.reset();
  };
});
