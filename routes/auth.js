var express = require('express')
var router = express.Router()
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

var GITHUB_CLIENT_ID = "0246998c2406c9df9fe3"
var GITHUB_CLIENT_SECRET = "5231efd89190ddeeb2bb03028c6c5789ac577872"

passport.serializeUser(function(user, done) {
    console.log('---------------serializeUser---------------')
    console.log(user)
    console.log('---------------serializeUser---------------')
    done(null, user.id)//此id就是sessionID
})

passport.deserializeUser(function(id, done) {
    console.log('---------------deserializeUser---------------')
    console.log(id)
    console.log('---------------deserializeUser---------------')
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://fanzhuolei.club/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user)
    // })
  }
))


router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
      console.log('seccess11111')
    // req.session.user = {
    //   id: req.user.id,
    //   username: req.user.displayName || req.user.username,
    //   avatar: req.user._json.avatar_url,
    //   provider: req.user.provider
    // };
    // res.redirect('/');
  });

module.exports = router