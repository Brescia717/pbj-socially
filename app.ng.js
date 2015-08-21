Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  // These are the dependencies (similar to gems in Rails)
  angular.module('socially', ['angular-meteor', 'ui.router']);

  // Config
  angular.module('socially').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'parties-list.ng.html',
          controller: 'PartiesListCtrl'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'party-details.ng.html',
          controller: 'PartyDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/parties");
    }]);

  // Controllers
  angular.module('socially').controller('PartiesListCtrl', function ($scope, $meteor) {
    // In Ruby, these would be methods
    $scope.parties = $meteor.collection(Parties);

    $scope.remove = function(party) {
      $scope.parties.remove(party);
    };

    $scope.removeAll = function() {
      $scope.parties.remove();
    };
  });

  angular.module("socially").controller("PartyDetailsCtrl", function($scope, $stateParams, $meteor) {
    $scope.party = $meteor.object(Parties, $stateParams.partyId, false);

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
}

// What is run everytime the server boots
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < parties.length; i++)
        Parties.insert(parties[i]);
    }
  });
}
