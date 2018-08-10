import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Popular from './Popular.jsx';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <ul className="movies">
            {this.props.movies.map((movie, index) => (
                <li  className="movie_item" key={index} onClick={() => this.props.veiwSingleMovie(movie)} >
                <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} />
                <div className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                    <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date.slice(0,4)}</span>
                    </div>
                    <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                    </div>
                </section>
                </div>
                </li>
            ))}
            </ul>
        )
    }
}

export default MovieList;

// Just in case xD
                // <li  className="movie_item" key={index} onClick={() => this.veiwSingleMovie(movie)} >
                // <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} />
                // <div className="movie_description">
                // <h2>{movie.title}</h2>
                // <section className="movie_details">
                //     <div className="movie_year">
                //     <span className="title">Year</span>
                //     <span>{movie.release_date.slice(0,4)}</span>
                //     </div>
                //     <div className="movie_rating">
                //     <span className="title">Rating</span>
                //     <span>{movie.vote_average}</span>
                //     </div>
                // </section>
                // </div>
                // </li>