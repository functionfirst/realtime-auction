const { isProduction } = require('../lib/env');

const sslHeader = req => req.headers['x-forwarded-proto'] === 'https';

/**
 * Enforce SSL on production server
 */
const enforceSSL = (req, res, next) => {
    let isNotSSL = !sslHeader(req);

    if (isProduction && isNotSSL) {
        return res.redirect(`https://${req.get('Host')}${req.url}`);
    }

    return next();
}

module.exports = enforceSSL;
