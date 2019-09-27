import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import PassportFacebook from 'passport-facebook';

dotenv.config();

// Initialize MongoDB
mongoose.connect(process.env.DB_URI as string, { useNewUrlParser: true });
const db = mongoose.connection;

const app = express();

app.use(passport.initialize());
const FacebookStrategy = PassportFacebook.Strategy;

passport.use(new FacebookStrategy({
  clientID: <string>process.env.FACEBOOK_APP_ID,
  clientSecret: <string>process.env.FACEBOOK_APP_SECRET,
  callbackURL: <string>process.env.FACEBOOK_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => {
  done(null, user);
});

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

// Facebook login routes

// Two routes are required for Facebook authentication. The first route redirects the user to Facebook.
// The second route is the URL to which Facebook will redirect the user after they have logged in.

// 1st route
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// 2nd route
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', passport.authenticate('facebook', {}), (req, res) => {
  res.redirect(`${process.env.FACEBOOK_REDIRECT_URL}?user=${JSON.stringify(req.user)}`);
});

app.get('/facebookLoginSuccess', (req: express.Request, res: express.Response) => {
  const { displayName, id } = JSON.parse(req.query.user);
  res.render('facebook-login-success', {
    displayName, id
  });
});

app.listen(3000, () => console.log('The server is running on http://localhost:3000'));
