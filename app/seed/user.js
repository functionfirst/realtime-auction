var User   = require('../models/user');

var admin = {
  name: 'Admin',
  pobox: 'NE1 9TG',
  address: '76 Howden Road',
  city: 'Newcastyle-upon-tyne',
  mobile: '0786 096 235',
  username: 'admin',
  password: 'admin',
  admin: true,
  confirm_password: 'admin'
};

var player1 = {
  name: 'Player 1',
  pobox: 'OX13 4JK',
  address: '24 Sureberry DRive',
  city: 'Oxford',
  mobile: '0800 345 234',
  username: 'player1',
  password: 'demo',
  confirm_password: 'demo'
};

var player2 = {
  name: 'Player 2',
  pobox: 'BN14 9GH',
  address: '18 Fairmount Crescent',
  city: 'Brighton',
  mobile: '0800 345 234',
  username: 'player2',
  password: 'demo',
  confirm_password: 'demo'
};


function create(properties){
  user = new User(properties);
  user.blocked = false;

	// save user and error check
	user.save(function(err, u) {
		if (err) {
			// check for duplicate user entry
			if (err.code == 11000) {
        console.log('A User with the username "' + properties.username + '" already exists.')
			} else {
				console.log(err);
			}
      return;
		}
    
    console.log('User "' + properties.username + '" created.');
    return;
	})
};

module.exports = {
  seed: function() {
    create(admin);
    create(player1);
    create(player2);
  }
}