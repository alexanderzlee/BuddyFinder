var accountSid = 'AC07bf1b61609eec624db936213ec10980';
var authToken = '20c5f3f142509e2a903988a426debc70';

var client = require('twilio')(accountSid, authToken);

  client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: '7349254818',
      from: '+16062632051'
  }, function(err, call) {
      if(err) {
          console.log(err);
      } else {
          console.log(call.sid);
      }
  });
