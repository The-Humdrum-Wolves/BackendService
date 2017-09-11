const { Router } = require('express');
const { ObjectID } = require('mongodb');

const attachTo = (app, data) => {
    const router = new Router();

    router
    .post('/update/:id', (req, res) => {
        const id = req.params.id;
        const createUser = {
            _id: new ObjectID(id),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            age: req.body.age
        }

        data.users.updateById(createUser);

        res.send('done');
    })
    .post('/', (req, res) => {
        // TODO: Add validation
        // TODO: Move to separate controller
        const createUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            age: req.body.age
        }
        
        data.users.create(createUser);

        data.users.findByEmail(createUser.email)
            .then(user => {
                req.logIn(user, (err) => {
                    if (err) { 
                        return new Error('Login error');
                    }

                    req.user = user;
                    return res.json({ id: req.user._id });
                });
            });
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        data.users.findById(new ObjectID(id))
            .then(user => res.json(user));
    });

    app.use('/users', router);
};

module.exports = { attachTo };