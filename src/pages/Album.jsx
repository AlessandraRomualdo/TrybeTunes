import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import './album.css';

export default class Album extends Component {
  state = {
    list: '',
    oneAlbum: '',
    loading: true,
    listFav: '',
  };

  componentDidMount() {
    this.requestListMusic();
  }

  requestListMusic = async () => {
    const { match: { params: { id } } } = this.props;

    const list = await getMusics(id);
    // console.log('antes do set', list);
    // const test = list[0];
    // // console.log(test);
    // this.setState({ oneAlbum: test });
    // // list.shift();
    // const musicList = [];
    // for (let i = 1; i < list.length; i += 1) {
    //   musicList.push(list[i]);
    // }
    // console.log(musicList);
    const [infoAlbum, ...musicList] = list;
    this.setState({ list: musicList, oneAlbum: infoAlbum, loading: false });
  };

  render() {
    const { oneAlbum, list, loading } = this.state;
    const { listFav } = this.state;
    console.log(listFav);
    return (
      <div data-testid="page-album">
        <div className="page"><h1>Album</h1></div>
        <Header />
        <section className="container-music">
          <section className="info-album">
            <img
              className="img-album"
              src={ oneAlbum.artworkUrl100 }
              alt={ oneAlbum.artistName }
            />
            <h4
              className="name-artits"
              data-testid="artist-name"
            >
              { oneAlbum.artistName}

            </h4>
            <p className="album-na" data-testid="album-name">{oneAlbum.collectionName}</p>
          </section>
          <section className="container-musics">
            {loading ? <Carregando /> : (
              list.map((music, index) => (
                <MusicCard key={ index } music={ music } />
              ))
            )}
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
