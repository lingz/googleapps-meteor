Package.describe({
  summary: "Google OAuth flow",
  // internal for now. Should be external when it has a richer API to do
  // actual API things with the service, not just handle the OAuth flow.
  internal: true
});

Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.export('GoogleApps');

  api.add_files(
    ['googleapps_configure.html', 'googleapps_configure.js'],
    'client');

  api.add_files('googleapps_server.js', 'server');
  api.add_files('googleapps_client.js', 'client');
});
