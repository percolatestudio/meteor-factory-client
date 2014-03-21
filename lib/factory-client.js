var oldCreate = Factory._create;

if (Meteor.isClient) {
  var lastRecord;
  
  Factory._create = function(name, doc) {
    Meteor.call('factoryInsert', name, doc);
    var record = lastRecord;
    return record;
  };
}

Meteor.methods({
  factoryInsert: function(name, doc) {
    var record = oldCreate(name, doc);
    
    // XXX: this is a nasty hack because Meteor doesn't give us a way of 
    // getting the return value of a stub.
    if (Meteor.isClient) {
      lastRecord = record;
    }

    return record;
  }
});
