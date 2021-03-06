/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  'new': function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    var userObj = {
      email: req.param('email'),
      password: req.param('password')
    }

    User.create(userObj, function userCreated (err, user) {
      if (err) {
        req.session.flash = {
          err: err
        }
        return res.redirect('/user/new');
      }

      //login user
      // req.session.authenticated = true;
      // req.session.User = user;

      res.redirect('/user');
    })
  },

  show: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },

  edit: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next('User doesn\'t exists.');

      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next) {
    var userObj = {
      email: req.param('email'),
      password: req.param('password')
    }

    User.update(req.param('id'), userObj, function userUpdated (err, user){
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next){
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next('User doesn\'t exists.');

      User.destroy(user.id, function userDestroyed(err){
        if (err) return next(err);
      });

      res.redirect('/user');
    })
  },

  index: function(req, res, next) {
    User.find(function foundUsers (err, users) {
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  },

  _config: {}
};
