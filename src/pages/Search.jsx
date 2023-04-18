import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import Card from '../components/Card';
import './search.css';

export default class Search extends Component {
  state = {
    artist: '',
    btnDisabled: true,
    isLoaging: false,
    nameArtist: '',
    discs: '',
  };

  valideBtn = () => {
    const { artist } = this.state;
    const minCaracter = 2;
    const valBtn = artist.length >= minCaracter;
    this.setState({ btnDisabled: !valBtn });
  };

  handleInputChange = async ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    }, this.valideBtn);
  };

  request = async () => {
    const { artist } = this.state;
    this.setState({ isLoaging: true });
    const discs = await searchAlbumsAPI(artist);
    console.log(discs);
    this.setState({ nameArtist: artist, artist: '', discs });
    this.setState({ isLoaging: false });
  };

  render() {
    const { artist, btnDisabled, isLoaging, nameArtist, discs } = this.state;
    return (
      <div data-testid="page-search">
        <div className="page"><h1>Search</h1></div>
        <Header />
        <form action="">

          <div className="container-form">
            <input
              className="input-search"
              data-testid="search-artist-input"
              placeholder="Busque por um artista ou banda"
              type="text"
              name="artist"
              value={ artist }
              onChange={ this.handleInputChange }
            />
            <button
              className="btn-search"
              disabled={ btnDisabled }
              onClick={ this.request }
              data-testid="search-artist-button"
              type="button"
            >
              Pesquisar
            </button>
          </div>
        </form>
        { isLoaging ? <Carregando /> : (
          <div>
            {discs.length <= 0 ? (
              <p className="not-found">Nenhum álbum foi encontrado</p>
            ) : (
              <section>
                <h4 className="resultSeach">{`Resultado de álbuns de: ${nameArtist}`}</h4>
                <div className="albuns-section">
                  {discs.map((disc, index) => (
                    <Link
                      key={ index }
                      data-testid={ `link-to-album-${disc.collectionId}` }
                      to={ `/album/${disc.collectionId}` }
                    >
                      <Card album={ disc } />
                    </Link>
                  ))}
                </div>
              </section>

            )}
          </div>

        )}
      </div>
    );
  }
}
