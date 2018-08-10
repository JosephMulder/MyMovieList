import React from 'react';
import InYouTube from './InYouTube.jsx';
import axios from 'axios';

class SingleMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [0,1,2,3,4,5,6,7,8,9,10]
        }
        this.givetitle = this.givetitle.bind(this);
        this.addtowatchlist = this.addtowatchlist.bind(this);
    }

    givetitle() {
        return this.props.singlemovie.title ? this.props.singlemovie.title : this.props.singlemovie.name;
    }

    addtowatchlist(type) {
        if (this.props.user) {
            if (type === "watched") {
                console.log('watched ran!');
                axios.post('/profile', {username: this.props.user, moviename: this.props.singlemovie.title, score: 11, favorites: "null"})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (type === "favorite") {
                console.log('fasvorite ran!');
                axios.post('/profile', {username: this.props.user, moviename: this.props.singlemovie.title, score: 11, favorites: "true"})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (typeof type === "object") {
                    console.log('score ran!', type.target.value);
                axios.post('/profile', {username: this.props.user, moviename: this.props.singlemovie.title, score: type.target.value, favorites: "null"})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        } else {
            alert('Need to login first!');
        }
    }

    render() {
        console.log(this.props, "hello earthlings!");
        return (
            <div className="sectionsetup">
             {this.props.singlemovie.title || this.props.singlemovie.name ? 
            <section className="inner_content">
               <div className="header large border first">
                 <div className="custom_bg">
                    <div className="poster">
                        <img src={`https://image.tmdb.org/t/p/w1280${this.props.singlemovie.poster_path}`} width="100%" />
                    </div>

                    <div className="movietitle">
                         <h6>{this.props.singlemovie.title ? this.props.singlemovie.title : this.props.singlemovie.name}</h6>
                         <p6>{this.props.singlemovie.overview}</p6>
                    </div>
                 </div>
                 <style dangerouslySetInnerHTML={{__html: `.header.large.first { background: url(https://image.tmdb.org/t/p/w1280${this.props.singlemovie.backdrop_path}); 
                width: 73%; background-size: cover; }`}}>
               </style>
               </div>
               {/* {this.props.singlemovie.title ? <InYouTube title={this.props.singlemovie.title ? this.props.singlemovie.title : this.props.singlemovie.name}/> :<p>Hi</p>} */}
                <InYouTube title={this.props.singlemovie.title ? this.props.singlemovie.title : this.props.singlemovie.name}/>
                <button className="addmovieL" onClick={() => this.addtowatchlist("watched")}>Add to watched list</button>
                <button className="addmovieF" onClick={() => this.addtowatchlist("favorite")}>Add to Favorites</button>
                {/* <button className="addmovieG">Grade Movie</button> */}
                <select className="addmovieG" onChange={this.addtowatchlist}>
                    <option>Rate Movie</option>
                    {this.state.grades.map((grade, index) =>(
                        <option value={grade} key={index}>{grade}</option>
                    ))}

                </select>

            </section>
        : <div id="error"><p>Could not find that movie try again</p></div>}
        </div>

        )
    }
}

export default SingleMovie;
