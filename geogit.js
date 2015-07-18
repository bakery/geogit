if (Meteor.isServer) {
  Meteor.startup(function () {
    IPGeocoder.load();
  });
}
