import { isProduction } from '../lib/env.js'

const sslHeader = req => req.headers['x-forwarded-proto'] === 'https'

/**
 * Enforce SSL on production server
 */
const enforceSSL = (req, res, next) => {
    let isNotSSL = !sslHeader(req)

    if (isProduction && isNotSSL) {
        return res.redirect(`https://${req.get('Host')}${req.url}`)
    }

    return next()
}

export default enforceSSL
