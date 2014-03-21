Package.describe({
  summary: 'Add-on package for Factory that allows unrestricted client-side creation of factory data'
});

Package.on_use(function(api) {
  api.use('factory');
  api.add_files('lib/factory-client.js', ['client', 'server']);
});

Package.on_test(function(api) {
  api.use('factory-client');
});
