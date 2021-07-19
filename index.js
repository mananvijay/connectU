const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts',true);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'connectu',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "MongoStore is working fine");
        }
    )
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`OOPS, Error Occurred ${err}`);
    }
    console.log(`Express Working smoothly on port: ${port}`);
});