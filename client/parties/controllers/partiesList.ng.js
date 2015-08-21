angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor) {
  // In Ruby, these would be methods
  $scope.parties = $meteor.collection(Parties).subscribe('parties');

  $scope.remove = function(party) {
    $scope.parties.remove(party);
  };

  $scope.removeAll = function() {
    $scope.parties.remove();
  };
});
