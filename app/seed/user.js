var User = require('../models/user');

var admin = {
  name: 'Admin',
  email: 'admin',
  password: 'admin',
  admin: true,
  confirm_password: 'admin'
};

var player1 = {
  name: 'Player 1',
  email: 'player1',
  password: 'demo',
  confirm_password: 'demo'
};

var player2 = {
  name: 'Player 2',
  email: 'player2',
  password: 'demo',
  confirm_password: 'demo'
};


function create(properties) {
  user = new User(properties);
  user.blocked = false;

  // save user and error check
  user.save(function (err, u) {
    if (err) {
      // check for duplicate user entry
      console.log(err);
      if (err.code == 11000) {
        console.log('A User with the email "' + properties.email + '" already exists.')
      } else {
        console.log(err);
      }
      return;
    }

    console.log('User "' + properties.email + '" created.');
    return;
  })
};

module.exports = {
  seed: function () {
    create(admin);
    create(player1);
    create(player2);
  }
}
