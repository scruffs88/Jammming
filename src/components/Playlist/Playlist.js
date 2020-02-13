import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
        <TrackList
          tracks={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          onChange={this.handleNameChange}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
} // How and what does (event.target.value) do in this context?

export default Playlist;
