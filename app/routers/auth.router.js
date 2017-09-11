const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();

    router.post('/sign-in', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            req.logIn(user, (err) => {
                if (err) { 
                    return next(err); 
                }
                req.user = user;
                return res.json({ id: req.user._id });
            });
        })(req, res, next);
    })
    .get('/logout', (req, res) => {
        req.logout();
        res.send('Logged out');
    });

    app.use('/auth', router);
};

module.exports = { attachTo };