var oldCreate = Factory._create;

if (Meteor.isClient) {
  var lastRecord;
  
  Factory._create = function(name, doc) {
    Meteor.call('factoryInsert', name, doc);
    var record = lastRecord;
    return record;
  };

  // use this function to ensure that all the client-side factory creates you've written are in the DB on the server.
  //
  // The way this works is using the fact that by default Meteor Methods block each other per-user.
  // So if we wait for a 'null' write method to complete, this will guarantee that all earlier method's we called 
  // (namely inserts) have finished before the callback is executed.
  flushWrites = function(fn) {
    Meteor.call('flush', function() {
      fn.apply(this);
    });
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
  },
  flush: function() {
    // do nothing
  }
});
