const UserData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        users: new UserData(db),
    });
};

module.exports = { init };