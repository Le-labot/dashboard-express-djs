const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const expressStatic = require("express-static-search");

module.exports = (client) => {
    const app = express();
    require('./passport/discordStrategy')(passport)
    app.bot = client;
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, 'views'));
    app.use(expressStatic(path.resolve(__dirname, 'public')));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: 'keyboardcat',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    const indexRouter = new express.Router()
    indexRouter.get('/', (req, res) => {
        res.render('index', {
            title: 'dashboard',
            bot: app.bot,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        });
    })
    indexRouter.get('/login', passport.authenticate("discord", { scope: ["identify", "guilds"], prompt: 'consent' }), (req, res) => {
        req.session.backURL = "/";
    }
    );

    indexRouter.get('/callback', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
        res.redirect('/');
    });
    indexRouter.get('/logout', (req, res) => {
        req.session.destroy(() => {
            req.logout()
            res.redirect('/')
        });
    });
    app.use('/', indexRouter);

    app.environement = require('./env');
    app.environement(true);

    return app
}
