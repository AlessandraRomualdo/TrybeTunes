import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import './fav.css';

export default class Favorites extends Component {
  state = {
    loadin: true,
    listFavorites: '',
  };

  componentDidMount() {
    this.loadinFavorites();
  }

  loadinFavorites = async () => {
    const listFavorites = await getFavoriteSongs();
    this.setState({ listFavorites, loadin: false });
  };

  render() {
    const { listFavorites, loadin } = this.state;
    console.log(listFavorites);
    return (
      <div data-testid="page-favorites">
        <div className="page"><h1>Favorites</h1></div>
        <Header />

        <section>
          { loadin ? <Carregando /> : (
            listFavorites.map((song, index) => (
              <MusicCard key={ index } music={ song } />))
          )}
          {listFavorites.length === 0
          && (
            <div className="msg-fav-nome">
              <h1>
                As músicas que você curtir
                vão aparecer aqui ❤
              </h1>

            </div>)}
        </section>
      </div>

    );
  }
}
