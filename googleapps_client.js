GoogleApps = {};

// Request GoogleApps credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
GoogleApps.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'googleApps'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  // always need this to get user id from google.
  var requiredScope = ['https://www.googleapis.com/auth/userinfo.profile'];
  var scope = ['https://www.googleapis.com/auth/userinfo.email'];
  if (options.requestPermissions)
    scope = options.requestPermissions;
  scope = _.union(scope, requiredScope);
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  // https://developers.google.com/accounts/docs/OAuth2WebServer#formingtheurl
  var accessType = options.requestOfflineToken ? 'offline' : 'online';
  var approvalPrompt = options.forceApprovalPrompt ? 'force' : 'auto';

  var loginUrl =
        'https://accounts.google.com/o/oauth2/auth' +
        '?response_type=code' +
        '&hd=' + config.domain +
        '&client_id=' + config.clientId +
        '&scope=' + flatScope +
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/googleApps?close') +
        '&state=' + credentialToken +
        '&access_type=' + accessType +
        '&approval_prompt=' + approvalPrompt;

  Oauth.initiateLogin(credentialToken,
                      loginUrl,
                      credentialRequestCompleteCallback,
                      { height: 406 });
};
