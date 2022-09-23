import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return <div>Loading...</div>;
    }
    return (
      <div>
      <Link to="/">Back</Link>
        <ul className="collection">
          <li className="collection-item">
            {song.title}
            <i className="material-icons">okay</i>
          </li>
        </ul>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
