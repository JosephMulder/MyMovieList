let model = require("../model/index.js");

module.exports = {
    users: {
        get: function(req, res) {
            model.users.get(req.query, (err, result) => {
                if (err) {
                    console.log(err);
                } else {

                    if (result[0] !== undefined) {

                        let userData = {
                            id: result[0].id,
                            username: result[0].username
                        }
                        req.session.userData = userData;
                    }
                    res.send(result);
                }
            });
        },
        post: function(req, res, next) {
            model.users.post(req.body, (err, result) => {
              if (err) {
                  next(err);
              } else {
                  res.send(result);
              }
            });
        }
    },
    profile: {
        get: function(req, res) {
            model.profile.get({username: req.query.username}, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            })
        },
        post: function(req, res) {
            model.profile.post({username: req.body.username, moviename: req.body.moviename, score: req.body.score, favorites: req.body.favorites}, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            })
        }
    }
}