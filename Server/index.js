var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var api = require('../database/config.js').API_KEY;
var controller = require("./controllers/index.js");
var session = require('express-session');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({ secret: 'Movie-app', saveUninitialized: false, resave: false, cookie: { maxAge: 120000 }}))


var getDate = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd;
  } 
  if(mm<10) {
    mm = '0'+mm;
  } 
  today = yyyy + '-' + mm + '-' + dd;
    return today;
}
var getStart = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
   
    if (mm < 5) {
        yyyy--;
        var newMonth = 8 + mm;
        mm = newMonth;
    } else {
        mm -=4;
    }
    if(dd<10) {
        dd = '0'+dd;
      } 
      if(mm<10) {
        mm = '0'+mm;
      }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
var today = getDate();
var monthsAgo = getStart();

app.get('/list', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&language=en-US&primary_release_date.gte=${monthsAgo}&primary_release_date.lte=${today}`)
    .then((response) => {
        res.send(response.data) 
    })
    .catch((err) => {console.log(err)})
});

app.get('/top', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&/discover/movie?certification_country=US&certification.lte=G&sort_by=revenue.desc`)
    .then((response) => {
        res.send(response.data) 
    })
    .catch((err) => {console.log(err)})
});

 app.get('/tv', function(req, res) {
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api}&sort_by=popularity.desc`)
    .then((response) => {
        res.send(response.data) 
    })
    .catch((err) => {console.log(err)})
});

app.get('/youtube', function(req, res) {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet`, {
        params: {key: "AIzaSyCoIh5wJQ0q1ZxAMDYP6-hqKPIheFlTjK8", term: "harry potter", maxResults: 6}
    })
    .then((res) => {
        console.log('this actually worked?', res);
    })
})


app.get('/search', function(req, res) {
        console.log('is it this', req.query[0]);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&page=1&include_adult=false&query=${req.query[0]}`)
    .then((response) => {
        console.log('this actually worked?', response.data.results[0]);
        res.send(response.data.results[0]);
    })
    .catch((err) => {
        console.log(err);
    })
})

//Profile info

app.post('/profile', controller.profile.post);

app.get('/profile', controller.profile.get);




//authentification maybe

app.post('/signup', controller.users.post);

app.get('/login', controller.users.get);

app.get('/logout', function(req,res){
    delete req.session.userData
    res.redirect('/')
  });
    // Make query to database where 
    // we check if user exists
    // if not we insert them into database!
//     controller.users.post();
// );
app.get('/auth', function(req,res){
    console.log('this thing ran hjrder', req.session);
    res.send(req.session.userData);
  });

function isAuth(req, res, next) {
    console.log('this thing actually fucking runs', req.session);
    if(req.session.userData) {
        console.log('MUSHIEMUSHIE', req.session);
      next(); 
    } else {
        console.log('YUI', req.session);
      res.redirect('/auth');
    } 
  }

// OK SO THEY SET THE USERS SESSION WHEN THEY LOGIN AND SINGUP
// BUT DO NOT DO THE AUTH THING AT THE FUNCTION
// SO I NEEED SOMETHING ELSE TO DO THE AUTH FOR 
// MAYBE DIRECTLY AFTER WE MAKE A GET REQUEST TO '/auth' IN THE CLIENT 
// THAT WILL THEN CHECK IF THE USER IS AUTH 
// AND SOMEHOW THAT WILL MAKE IT PERSIST? MAYBE?
// FUCK I DON""T KNOW"
// SO THE USER LOGINS AND IT IMMEDIATELY CHECKS FOR AUTH AND THEN WE NEED IT TO HAPPEN EVERY TIME ON RELOAD
// WE MIGHT HAVE THIS SOMEWHAT IN PLACE ALREADY

// Wrong endpoint handler 
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });


let port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('listening on port 3000!');
});
