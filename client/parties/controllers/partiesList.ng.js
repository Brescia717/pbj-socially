angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor) {
  // In Ruby, these would be methods
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = { name: 1 };
  $scope.orderProperty = '1';

  $scope.parties = $meteor.collection(function() {
    return Parties.find({}, {
      sort : $scope.getReactively('sort')
    });
  });

  $meteor.autorun($scope, function() {
    $meteor.subscribe('parties', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.partiesCounts = $meteor.object(Counts ,'numberOfParties', false);
    });
  });

  $scope.pageChanged = function (newPage) {
    $scope.page = newPage;
  }

  $scope.$watch('orderProperty', function() {
    if ($scope.orderProperty)
      $scope.sort = { name: parseInt($scope.orderProperty)}
  });

  $scope.remove = function(party) {
    $scope.parties.remove(party);
  };

  $scope.removeAll = function() {
    $scope.parties.remove();
  };
});
