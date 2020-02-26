const Auction = require('../models/auction');

const getDate = days => {
  let date = new Date();

  if (days) {
    date.setDate(date.getDate() + days);
  }

  return date;
}

let auctions = [
  {
    name: 'Dummy Auction',
    startDate: getDate(),
    endDate: getDate(3),
    description: 'This is some dummy auction content',
    startAmount: 100,
    enabled: true,
    countdown: 2
  }
];

const create = async properties => {
  try {
    let auction = new Auction(properties);
    await auction.save()

    console.log('Auction created');
  } catch (err) {
    if (err.code == 11000) {
      console.log('An Auction with the name "' + properties.name + '" already exists.')
    } else {
      console.log(err.message);
    }
  }
}

const seed = () => {
  auctions.forEach(user => create(user));
}

module.exports = {
  seed
}
