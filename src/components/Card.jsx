import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './card.css';

export default class Card extends Component {
  render() {
    const { album } = this.props;
    const { artistName, artworkUrl100, collectionName } = album;
    return (
      <div className="card">
        <img className="img-card" src={ artworkUrl100 } alt={ artistName } />
        <p className="album-name">{ collectionName }</p>
        <p className="artist-name">{ artistName }</p>
      </div>
    );
  }
}

Card.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};
