let db = require('../../database/database.js');


module.exports = {
    users: {
        get: function(input, callback) {
            // console.log(input, input.username, input.password);
            db.query(`SELECT * FROM users WHERE username="${input.username}" && password="${input.password}"`, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            })

        },
        post: function(input, callback) {
            db.query(`INSERT INTO users (username, password) VALUES ("${input.username}", "${input.password}")`, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, {id: result.insertId, username: input.username});
                }
            })
            console.log('model says hello post request');
        }
    },
    profile: {
        get: function(input, callback) {
            console.log('profile get request model!');
            db.query(`SELECT * FROM watched WHERE username="${input.username}"`, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            })
        },
        post: function(input, callback) {
            console.log('profile post request model!');
            db.query(`SELECT * FROM watched WHERE username="${input.username}" && moviename="${input.moviename}"`, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    // If the movie isn't in db insert it
                    if (result.length === 0) {
                        db.query(`INSERT INTO watched (username, moviename, score, favorites) VALUES ("${input.username}", "${input.moviename}", ${input.score}, "${input.favorites}")`, (err, result) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, result);
                            }
                        })
                    // else movie is in db, just update to specification 
                    } else {
                        // if input.score !== 11 update score
                        if (input.score !== 11) {
                            // console.log('changed the score 1010101010101');
                            db.query(`UPDATE watched SET watched.score=${input.score} WHERE username="${input.username}" && moviename="${input.moviename}"`, (err, result) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, result);
                                }
                            })
                        // else if input.favorite === true update favorites
                        } else if (input.favorites === "true") {
                            // console.log('changed the favorite 1010101010101');
                            db.query(`UPDATE watched SET watched.favorites="${input.favorites}" WHERE username="${input.username}" && moviename="${input.moviename}"`, (err, result) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, result);
                                }
                            })
                        }
                        
                    }
                }           
            })


            // db.query(`INSERT INTO watched (username, moviename, score, favorites) VALUES ("${input.username}", "${input.moviename}", ${input.score}, "${input.favorites}")`, (err, result) => {
            //     if (err) {
            //         callback(err);
            //     } else {
            //         callback(null, result);
            //     }
            // })
        }
    }
}

//First we make a query to check if the movie is already entered. 
// if it isn't we just put it there
// if it is we update it!