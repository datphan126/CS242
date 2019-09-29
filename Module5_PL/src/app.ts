import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth';

// Load system environment variables
dotenv.config();

// Initialize MongoDB
mongoose.connect(process.env.DB_URI as string, { useNewUrlParser: true });
const db = mongoose.connection;

const app = express();

app.use(passport.initialize());
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: <string>process.env.GOOGLE_CLIENT_ID,
    clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: <string>process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => done(null, profile)
));

// Set passport session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Retrieve user information set by the above code and assign the info to the request object as req.user.
passport.deserializeUser((user, done) => {
    done(null, user);
});

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../public'));
app.set('views', './views');
app.set('view engine', 'ejs');

// Routers
app.get('/', (req, res) => res.render('index'));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
    '/auth/google/callback', passport.authenticate('google', {}), (req, res) => {
    res.redirect(`${process.env.GOOGLE_REDIRECT_URL}?user=${JSON.stringify(req.user)}`);
});

app.get('/googleLoginSuccess', (req: express.Request, res: express.Response) => {
    const user = JSON.parse(req.query.user);
    res.render('google-login-success', {
        displayName: `${user.displayName}`, email: `${user.emails[0].value}`
    });
});

// Setup Listen Server
app.listen(4000, () => console.log('The server is running on http://localhost:4000'));