import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import searchYouTube from "youtube-search-api-with-axios";
import YTSearch from 'youtube-api-search';

class InYouTube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "2g811Eo7K8U"
        }
        this.searching = this.searching.bind(this);
    }

    componentWillMount() {
        this.searching();
    }

    searching() {
        YTSearch({ key: "AIzaSyCoIh5wJQ0q1ZxAMDYP6-hqKPIheFlTjK8", term: this.props.title + ' trailer' }, result => {
            this.setState({
                id: result[0].id.videoId
            })
        });
    }

    render() {
        const opts = {
        height: '350em',
        width: '475em',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
        };
        {this.searching()}
        return (
        <div className="doesthiswork">  
        <YouTube
            videoId={this.state.id}
            opts={opts}
            onReady={this._onReady}
        />
        </div>
        );
    }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default InYouTube;
