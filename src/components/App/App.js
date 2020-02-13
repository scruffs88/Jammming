import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Use the track’s id property to check if the current song is in the playlistTracks state.
  // If the id is new, add the song to the end of the playlist.
  // Set the new state of the playlist.

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return;
    } else {
      const currentList = this.state.playlistTracks;
      currentList.push(track);

      this.setState({
        //change current state
        playlistTracks: currentList
      });
    }
  }

  // Filters tracks that already are on the playlist
  // Uses the track’s id property to filter it out of playlistTracks
  // Sets the new state of the playlist
  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(
      savedTrack => savedTrack.id !== track.id
    );

    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  //   Accepts a name argument
  //  Sets the state of the playlist name to the input argument

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(
      playlistTrack => playlistTrack.uri
    );
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName("My playlist");
    console.info(trackUris);
  }

  search(term) {
    Spotify.search(term).then(searchResults =>
      this.setState({
        searchResults: searchResults
      })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
