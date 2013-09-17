Template.configureLoginServiceDialogForGoogleApps.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForGoogleApps.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client secret'},
    {property: 'domain', label: 'Domain'}
  ];
};
