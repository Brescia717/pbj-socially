// These are the dependencies (similar to Gemfile in Rails)
angular.module('socially', ['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination']);

function onReady() {
  angular.bootstrap(document, ['socially']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
