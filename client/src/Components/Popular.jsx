import React, { Component } from 'react';
import axios from 'axios';
import MovieList from './MovieList.jsx';
import SingleMovie from './SingleMovie.jsx';


class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
           movies: [{release_date: 'stopssliceerror', poster_path: '/qjy8ABAbWooV4jLG6UjzDHlv4RB.jpg', backdrop_path: '/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg'}],
           top: [{release_date:'stopsliceerror'}],
           tele: [{release_date: 'stopslice'}],
           moviedescription: this.props.moviedescription,
           singlemovie: this.props.singlemovie
        }
      this.getMovies = this.getMovies.bind(this);
      this.veiwSingleMovie = this.veiwSingleMovie.bind(this);
    }

    componentWillMount() {
        this.getMovies();
    }

    veiwSingleMovie(info) {
       this.props.veiwMovie(info);
    }

    getMovies() {
      axios.get('/list')
        .then((res) => {
            this.setState({
                movies: res.data.results
            })
        })
        .catch((err) => {
            console.log(err);
        })

      axios.get('/top')
        .then((res) => {
            var topgrossing = res.data.results.slice(1, 11);
            this.setState({
                top: topgrossing
            })
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get('/tv')
        .then((res) => {
            var televis = res.data.results.slice(0, 10);
            this.setState({
                tele: televis
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
          <div id="hardflex">  
            <div id="sidebar">
              <div id="topgross">
               <ul className="topmovies">
                   <li className="movie_top" id="singleout">
                    <div className="movie_description additionalpad">
                       <strong>Top Grossing Films</strong>
                    </div> 
                   </li>
                    {this.state.top.map((movie, index) => (
                        <li className="movie_top hoverli" key={index} onClick={() => this.veiwSingleMovie(movie)}>
                            <button className="makelibutton">
                            <div className="movie_description">
                                {movie.title}
                            </div> 
                            </button>
                        </li> 
                    ))}

               </ul>
              </div>


              <div id="topgross">
               <ul className="topmovies">
                   <li className="movie_top" id="singleout">
                    <div className="movie_description additionalpad">
                       <strong>Popular Television Shows</strong>
                    </div> 
                   </li>
                    {this.state.tele.map((tv, index) => (
                        <li className="movie_top hoverli" key={index} onClick={() => this.veiwSingleMovie(tv)} >
                            <button className="makelibutton">
                            <div className="movie_description">
                                {tv.name}
                            </div> 
                            </button>
                        </li> 
                    ))}

               </ul>
              </div>
            </div>

            {this.props.moviedescription ?
            <MovieList movies={this.state.movies} veiwSingleMovie={this.veiwSingleMovie}/> 
            : <SingleMovie singlemovie={this.props.singlemovie} user={this.props.user}/>
            }

           </div>
        )
    }
}

export default Popular;

