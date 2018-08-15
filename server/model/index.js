let db = require('../../database/database.js');


module.exports = {
    users: {
        get: function(input, callback) {
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
        }
    },
    profile: {
        get: function(input, callback) {
            db.query(`SELECT * FROM watched WHERE username="${input.username}"`, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            })
        },
        post: function(input, callback) {
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
                            db.query(`UPDATE watched SET watched.score=${input.score} WHERE username="${input.username}" && moviename="${input.moviename}"`, (err, result) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, result);
                                }
                            })
                        // else if input.favorite === true update favorites
                        } else if (input.favorites === "true") {
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
        }
    }
}
