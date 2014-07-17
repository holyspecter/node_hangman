// todo separate by env if needed
module.exports =  {
    port: 3000,
    db: {
        debug: true,
        path: 'mongodb://localhost/hangman'
    },
    tokens: {
        facebook: {
            clientID: '308152342694568',
            clientSecret: '2513cba5c53aaa9aa4589df9f5a5d484',
            callbackURL: 'http://localhost:3000/'
        }
    },
    logs: {
        path: 'logs/hangman.log',
        level: 'TRACE',
        name: 'hangman'
    }
};
