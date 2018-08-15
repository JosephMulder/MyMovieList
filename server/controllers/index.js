let model = require("../model/index.js");

module.exports = {
    users: {
        get: function(req, res) {
            model.users.get(req.query, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('we just get request users', result);
                    if (result[0] !== undefined) {

                        let userData = {
                            id: result[0].id,
                            username: result[0].username
                        }
                        req.session.userData = userData;
                    }
                    console.log(req.session, 'this is in controllers');
                    res.send(result);
                }
            });
        },
        post: function(req, res, next) {
            // console.log(req.body, req.body.username, req.body.password);
            model.users.post(req.body, (err, result) => {
              if (err) {
                  next(err);
              } else {
                  console.log('we just inserted the thing', result);
                  res.send(result);
              }
            });
        }
    },
    profile: {
        get: function(req, res) {
            console.log('profile get request controller!', req.query);
            model.profile.get({username: req.query.username}, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("got info from db for profile");
                    res.send(result);
                }
            })
        },
        post: function(req, res) {
            console.log('profile post request controller!', req.body);
            model.profile.post({username: req.body.username, moviename: req.body.moviename, score: req.body.score, favorites: req.body.favorites}, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("we posted something to db for profile");
                    res.send(result);
                }
            })
        }
    }
}