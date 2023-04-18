import React, { Component } from 'react';
import { Link } from 'react-router-dom/';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import './profile.css';

export default class Profile extends Component {
  state = {
    loading: false,
    profile: {},
  };

  componentDidMount() {
    this.lodingProfile();
  }

  lodingProfile = async () => {
    this.setState({ loading: true });
    const res = await getUser();
    console.log(res);
    this.setState({ profile: res, loading: false });
  };

  render() {
    const { loading, profile } = this.state;
    // console.log(profile);
    return (
      <div data-testid="page-profile">
        <div className="page"><h1>Profile</h1></div>
        <Header />
        { loading ? <Carregando /> : (
          <div className="profile-info">

            <Link className="redirect" to="/profile/edit">Editar perfil</Link>
            <div className="container-img">
              <img
                className="profile-avatar"
                data-testid="profile-image"
                src={ profile.image }
                alt={ profile.name }
              />
            </div>
            <div className="container-infos">
              <p className="title-info"> Usuário</p>
              <p>{ profile.name }</p>
              <p className="title-info">Email</p>
              <p>{ profile.email }</p>
              <p className="title-info"> Descrição</p>
              <p>{ profile.description }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
