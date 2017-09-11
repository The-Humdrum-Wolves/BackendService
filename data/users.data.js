const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const { ObjectID } = require('mongodb');

class UserData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id
        }, model);
    }

    findByUsername(username) {
        const userToLower = username.toLowerCase();
        const user = this.collection.findOne({ username });

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user was found');
            }
            return resolve(user);
        });
    }

    findByEmail(email) {
        const userToLower = email.toLowerCase();
        const user = this.collection.findOne({ email });

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user was found');
            }
            return resolve(user);
        });
    }

    findById(_id) {
        return this.collection
            .findOne({ _id });
    }

    checkPassword(username, password) {
        return this.collection
            .findOne({ username })
            .then((user) => {
                if(!user) {
                    throw new Error('Invalid user');
                }
                if(user.password === password) {
                    throw new Error('Invalid password');
                }

                return true;
            })
    }

    _isModelValid(model) {
        // TODO: Add user validation
        return typeof model !== 'undefined' &&
            typeof model.email === 'string' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
            model.username.length > 3;
    }
}

module.exports = UserData;
