var machina = require('machina');

var SampleFsm = function () {
  var fsm = new machina.Fsm( {
    initialState : "idle",
    states : {
      "idle" : {
        _onEnter : function () {
          console.log('entering idle state');
        },
        "*" : function () {
          console.log('idling...');
        },
        "ring": function(payload) {
          console.log('ring ring!');
          this.transition('routing');
        }
      },
      "routing" : {
        _onEnter: function() {
          console.log('routing...');
        },
        "*" : function () {
          console.log('still routing...');
        },
        "connect": function() {
         console.log('click');
          this.transition('connected');
        }
      },
      "connected": {
        _onEnter: function() {
          console.log('connected!');
        },
        // handles anything not matching the 'connected' event
        "*" : function () {
          console.log('still connected...');
        }
      }
    }
  } );
  return fsm;
};

var fsm = new SampleFsm();
fsm.handle('ring');
fsm.handle('something');
fsm.handle('connect');
fsm.handle('something');



