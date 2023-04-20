import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import './musicCard.css';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  componentDidMount() {
    this.favVerif();
    // this.removeFavorit();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  addFavorite = async (music) => {
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ check: true, loading: false });
    console.log('props', music);
  };

  loadingFav = async () => {
    const listFav = await getFavoriteSongs();
    return listFav;
  };

  favVerif = async () => {
    const listFav = await this.loadingFav();
    const { music } = this.props;
    const { trackId } = music;
    const check = listFav.some((song) => song.trackId === trackId);
    this.setState({ check });
    if (check) {
      await removeSong(music);
      // await getFavoriteSongs();
      // this.setState({ check: false, loading: false });
    }
  };

  // removeFavorit = async () => {
  //   // const { check } = this.state;
  //   const listFav = await this.loadingFav();
  //   const { music } = this.props;
  //   if (listFav.includes(music)) {
  //     this.setState({ loading: true });
  //     await removeSong(music);
  //   }
  // };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, check } = this.state;
    return (
      <div className="container">

          <div className="container-previwer">
            <p className="track-name">{trackName}</p>
        {loading ? <Carregando /> : (
            <div className="container-track-fav">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <div class="heart-check">
                  <input
                    className="check-fav"
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    name="check"
                    checked={ check }
                    id={trackId}
                    onChange={ this.onInputChange }
                    onClick={ () => this.addFavorite(music) }
                  />
                  <label htmlFor={trackId}>Favorita</label>
              </div>
            </div>
        )}
          </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
