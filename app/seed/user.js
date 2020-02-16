var User = require('../models/user');

let users = [
  {
    name: 'Admin',
    email: 'admin',
    password: 'admin',
    admin: true,
    confirm_password: 'admin',
    blocked: false
  },
  {
    name: 'Player 1',
    email: 'player1',
    password: 'demo',
    confirm_password: 'demo',
    blocked: false
  },
  {
    name: 'Player 2',
    email: 'player2',
    password: 'demo',
    confirm_password: 'demo',
    blocked: false
  }
]

const create = async properties => {
  try {
    let user = new User(properties);
    await user.save()

    console.log(`User ${user.email} created.`);
  } catch (err) {
    if (err.code === 11000) {
      console.log(`A user with email ${properties.email} already exists`);
    } else {
      console.log(err.message);
    }
  }
};

const seed = () => {
  users.forEach(user => create(user));
}

module.exports = {
  seed
}
