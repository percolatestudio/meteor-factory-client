Package.describe({
  name: 'dburles:factory-client',
  version: '0.1.4',
  summary: 'Add-on package for Factory that allows unrestricted client-side creation of factory data',
  git: 'https://github.com/percolatestudio/meteor-factory-client.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('dburles:factory@0.3.10');
  api.add_files('lib/factory-client.js');
  api.export('flushWrites', 'client');
});
