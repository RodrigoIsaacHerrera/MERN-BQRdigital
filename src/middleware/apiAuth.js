const { timingSafeEqual } = require('crypto');

function createApiAuth(apiToken) {
    if (typeof apiToken !== 'string' || apiToken.length === 0) {
        throw new Error('A non-empty API token is required.');
    }

    const expectedToken = Buffer.from(apiToken);

    return function authenticateApiRequest(req, res, next) {
        const authorization = req.get('authorization') || '';
        const match = /^Bearer\s+([^\s]+)$/i.exec(authorization);

        if (!match) {
            return rejectRequest(res);
        }

        const suppliedToken = Buffer.from(match[1]);
        const tokenMatches = suppliedToken.length === expectedToken.length
            && timingSafeEqual(suppliedToken, expectedToken);

        if (!tokenMatches) {
            return rejectRequest(res);
        }

        return next();
    };
}

function rejectRequest(res) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = createApiAuth;
