import React, { Component } from 'react';
import soundwaves from './soundwaves.png';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
 

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      songs: '',
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ''},
      createBYPlaylist: null
    }
    console.log(params);
  }
  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while(e){
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e=r.exec(q);
    }
    return hashParams;
  }

  //Get Playback State
  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
    .then((response)=> {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      })
    })
  }

  //Search Tracks By Year
  getTracksByYear(){
    let year=document.querySelector('.input-year').value
    let albumNames = [];
    let songNames = [];
    // let songNames = [];
    console.log(year)
    spotifyApi.searchTracks('year:' + year)
  .then((response) => {
    // return response.tracks.items.map(function(a){return a.album.name});
    for(let i = 0; i < response.tracks.items.length; i++) {
      let album = response.tracks.items[i].album.name;
      let jam = response.tracks.items[i].name
      albumNames.push(album);
      songNames.push(jam)
      // console.log(album);
      // console.log(this.state.songs);
      // console.log(response.tracks.items.length);
      // console.log(albumNames);
    }
     this.setState({
       songs: songNames,
       albums: albumNames
     })
      console.log('Search by ' + year);
    }).then((function(response){
    console.log(response);
  }), function(err) {
    console.error(err);
  });
  }

  //Create a Playlist With Tracks
  createBYPlaylist(){
    spotifyApi.createPlaylist()
    .then((response) => {
      console.log('Created Playlist', response);
    }, function(err){
      console.log(err);
    });
  }
 

  render() {

    let titles = [];

    // // // albumNames.push(this.state.album)
    
      for(let i = 0; i < this.state.songs.length; i++) {

       titles.push(
       <ul>
         <li>{this.state.songs[i]}</li>
         </ul>
         
         );
      
      }
    
console.log(titles)
   

    return (
      <div className="container">
       <div className="top-interface">
       
         <div className="title-input">
           <h1 className="api-title">Birthyear Playlist</h1>
           <p className="api-instruct">Search for your birthyear below</p>
           <img src={soundwaves} className="sound-img" alt="soundwaves" />
           <div className="input-submit">
                 <input type="text" 
                 className="input-year" placeholder="Search"></input>
                 {this.state.loggedIn &&
                 <button
                  onClick={()=> this.getTracksByYear()}
                 className="submit-play"></button>
                 }
           </div>
           <div className="btn-holder">
                 {this.state.loggedIn && this.getTracksByYear &&
                 <button
                  onClick={()=> this.createBYPlaylist()}
                 className="create-playlist">Create Playlist</button>
                 }
                 </div>
         </div>
       </div>
       
       <div className="showPlaylists">
         <div className="login-spotify">
         <a className="link-btn" href='http://localhost:8888'>Login with Spotify</a>
         </div>
        {/* /*Playback State Displayed */}
           <div style={{'margin': '25px', 'marginTop': '45px'}}>
            {/* <li>{this.state.album}</li>      */}
            {titles} 
            {/* <ul><li>{`${this.state.songs}`}</li></ul>      */}
      </div>
      {/* Album Art of Playback State Displayed */}
      <div style={{'margin': '25px'}}>
        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt="album art" />
       </div>
       {/* Check Playback State Button */}
       { this.state.loggedIn &&
        <button style={{'margin': '25px'}} onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      }
 

           <div style={{'margin': '25px'}}>
        {/* <p> Get Tracks: {this.state.getTracksByYear.tracks} </p> */}
        

       </div>


     </div>   
    </div> 
 
       
     );
  }
}

export default App;




















  //Get Elvis Album test
  // getElvisAlbum(){
  //   spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  // .then((response) => {
  //   this.setState({
  //     getAlbum: {
  //       name: response.items[0].name,
  //       albumArt: response.items[0].images[0].url,
  //       release_date: response.items[0].release_date
  //     }
  //   })
  //   console.log('Artist albums', response);
  // }, function(err) {
  //   console.error(err);
  // });
  // }


   {/* Elvis Album Display Practice */}
    //  { this.state.loggedIn &&
    //   <button style={{'margin': '25px'}} onClick={() => this.getElvisAlbum()}>
    //   Get Elvis Albums
    // </button>
    //  }
    //  <div style={{'margin': '25px'}}>
    //    <p> Get Album: {this.state.getAlbum.name} </p>
    //    <img src={this.state.getAlbum.albumArt} style={{ height: 150 }}/>
    //    <p> Release Date: {this.state.getAlbum.release_date} </p>

    //   </div>