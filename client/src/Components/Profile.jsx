import React from 'react';
import axios from 'axios';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            favorites: [{title:"Harry Potter"}, {title: "Kong Fu Panda"}],
            watchedMovies: [{}],
            grades: [0,1,2,3,4,5,6,7,8,9,10]
        }
        this.watchedMovies = this.watchedMovies.bind(this);
    }

    watchedMovies() {
        if (this.state.user) {
          axios.get('/profile', {
              params: {username: this.state.user}
          })
            .then((res) => {
                console.log(res, 'axios get request for profile!');

                var newFavorites = [];

                for (var i = 0; i < res.data.length; i++) {

                    if (res.data[i].favorites === "true") {
                        newFavorites.push(res.data[i]);
                    }
                }
                this.setState({
                    watchedMovies: res.data,
                    favorites: newFavorites
                })
                console.log(this.state, 'I AM THE SENATE');
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    changescore(event, movie) {

        console.log(event.target.value, movie.moviename, 'HEY ITS ME !!!!');
        axios.post('/profile', {username: this.state.user, moviename: movie.moviename, score: event.target.value, favorites: "null"})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount() {
        this.watchedMovies();
    }

    render() {
        return (

<div id="hardflex">  
<div id="sidebar2">
    <div className="profilebanner">
        <img src="https://i.pinimg.com/originals/0e/65/e7/0e65e7640340a16068734dd46468fb9f.png" id="profilepic"/>
        <h1>Username: {this.state.user}</h1>
    </div>

    <div>
        <div id="topgross2">
           <ul className="topmovies">
             <li className="movie_top" id="singleout">
                <div className="movie_description">
                  <strong>Favorite Movies</strong>
                </div> 
             </li>
            {this.state.favorites.map((movie, index) => (
            <li className="movie_top hoverli" key={index} >
              <div className="movie_description">
                {movie.moviename}
              </div> 
            </li> 
            ))}
          </ul>
        </div>
    </div>
</div>


<div className="watchedmovies">
      <div className="txn-table">
        <div className="txn-header txn-row">
          <div className="txn-data">Watched Movies</div>
          <div className="txn-data">Your Score</div>
        </div>

          {this.state.watchedMovies.map((movie, index) => (
              <div className="txn-row hoverli" key={index}>
                    <div className="txn-data">{movie.moviename}</div>

                    <div className="txn-data">
                        <select className="scorebar" onChange={(event) => this.changescore(event, movie)}>
                        <option>{movie.score > 10 ? <span>Rate</span> : movie.score}</option>
                        {this.state.grades.map((grade, index) =>(
                            <option value={grade} key={index}>{grade}</option>
                        ))}
                        </select>
                    </div>

              </div>
          ))}
      </div> 
    </div> 
</div>
        )
    }
}

export default Profile;