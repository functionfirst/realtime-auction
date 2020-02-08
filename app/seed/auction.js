var Auction = require('../models/auction');

function create(properties) {
  var auction = new Auction(properties);

  auction.save(function (err) {
    if (err) {
      // check for duplicate user entry
      if (err.code == 11000) {
        console.log('An Auction with the name "' + properties.name + '" already exists.')
      } else {
        console.log(err);
      }
      return;
    }

    console.log('Auction created');
  });
}

function getDate(days) {
  var date = new Date();
  if (days) {
    date.setDate(date.getDate() + days);
  }

  return date;
}

module.exports = {
  seed: function () {
    create({
      name: 'Dummy Auction',
      start_date: getDate(),
      end_date: getDate(3),
      description: 'This is some dummy auction content',
      start_amount: 100,
      enabled: true,
      countdown: 2
    });
  }
};
