// These are the dependencies (similar to gems in Rails)
angular.module('socially', ['angular-meteor', 'ui.router']);

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
