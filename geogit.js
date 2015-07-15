if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //setInterval(function(){
    console.log('trying geocode...');

    IPGeocoder.geocode('128.101.101.101',function(err,geodata){
      // log data :D
      if(err){
        console.error(err);
      } else {
        console.log(geodata);
      }
    });
    //}, 5000);
  });
}
