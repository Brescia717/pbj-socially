angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor, $rootScope) {
  // In Ruby, these would be methods
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = { name: 1 };
  $scope.orderProperty = '1';

  // $scope.$meteorSubscribe('users');
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

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

      $scope.parties.forEach( function (party) {
        party.onClicked = function () {
          $state.go('partyDetails', {partyId: party._id});
        };
      });

      $scope.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8
      };
      
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

  $scope.rsvp = function(partyId, rsvp){
    $meteor.call('rsvp', partyId, rsvp).then(
      function(data){
        console.log('success responding', data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  };

  $scope.outstandingInvitations = function (party) {
    return _.filter($scope.users, function (user) {
      return (_.contains(party.invited, user._id) &&
      !_.findWhere(party.rsvps, {user: user._id}));
    });
  };

  $scope.getUserById = function(userId) {
    return Meteor.users.findOne(userId);
  };

  $scope.creator = function(party) {
    if (!party)
      return;
    var owner = $scope.getUserById(party.owner);
    if (!owner)
      return 'nobody';

    if ($rootScope.currentUser)
      if ($rootScope.currentUser._id)
        if (owner._id === $rootScope.currentUser._id)
          return 'me';

    return owner;
  };

  // $scope.removeAll = function() {
  //   $scope.parties.remove();
  // };
});
