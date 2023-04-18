// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './header.css';

export default class Header extends Component {
  state = {
    loading: false,
    name: '',
  };

  componentDidMount() {
    this.displayInfo();
  }

  displayInfo = async () => {
    this.setState({ loading: true });
    const newObj = await getUser();

    this.setState({ loading: false,
      name: newObj.name,
    });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <nav className="nav-bar">
          <Link className="link" data-testid="link-to-search" to="/search">Search</Link>
          <Link
            className="link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites

          </Link>
          <Link
            className="link"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile

          </Link>
        </nav>

        { loading
          ? <Carregando />
          : <p className="er" data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}
