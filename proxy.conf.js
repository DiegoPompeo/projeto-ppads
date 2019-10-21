const PROXY_CONFIG = [
    {
        context: ['/redesocial'],
        target: 'https://server-redesocial.herokuapp.com',
        secure: true,
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG;