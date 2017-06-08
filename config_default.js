var config = {};

// SERVER
config.port = 8080;

// SETTINGS
config.domain = 'http://yourdomain.com';
config.email = 'info@yourdomain.com';

// TOKEN
config.secret = 'enteryoursecrettoken';
config.tokenExpiry = 30; // days

// AWS CONFIG
config.aws = {
    bucket: '',
    host: '',
    accessKeyId: '',
    secretAccessKey: ''
}

// DATABASE
config.db = {
    name: 'realtime-auctions',
    host: 'localhost'
};

module.exports = config;