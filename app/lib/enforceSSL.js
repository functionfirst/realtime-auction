function enforceSSL(req, res, next) {
    var productionNotSSL = process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https';

    if(productionNotSSL) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }

    return next();
}

module.exports = enforceSSL;