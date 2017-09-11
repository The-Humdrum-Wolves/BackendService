const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const configAuth = (app, { users }) => {
    passport.use(new Strategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            return users.findByEmail(email)
                .then((user) => {
                    if(user.password !== password) {
                        done(new Error('Invalid password'));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    app.use(session({ 
        secret: 'fluffy wolf',    
        resave: true,
        saveUninitialized: true 
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {      
        done(null, user.username);
    });
    
    passport.deserializeUser((username, done) => {     
        return users.findByUsername(username)
            .then((user) => {
                done(null, user);
            })
            .catch(done);         
    });
}

module.exports = configAuth;