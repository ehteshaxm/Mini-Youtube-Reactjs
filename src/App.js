import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

export default class App extends Component {
  
  state = { videos: [], selectedVideo : null};
  
  youtube = async (term) => {

    var KEY = 'AIzaSyBc16X5s1AH5xpv3R9FqFi7mC3wEgBcZ6w';
    var response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
        q: term
      }
    });

    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }
  
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }
  
  render() {
    return (
      <div className='ui container'>
        <SearchBar onSubmit={this.youtube} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail  video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
