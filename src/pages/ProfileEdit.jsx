import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import './profileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    loaging: false,
    infos: '',
    disableBtn: true,
  };

  componentDidMount() {
    this.getInfos();
    this.validFiels();
  }

  getInfos = async () => {
    this.setState({ loaging: true });
    const res = await getUser();
    this.setState({
      infos: res,
      name: res.name,
      email: res.email,
      description: res.description,
      image: res.image,
      loaging: false });
  };

  validFiels = () => {
    const { name, email, description, image } = this.state;
    if (name === '' || email === '' || description === '' || image === '') {
      this.setState({ disableBtn: true });
      return false;
    }
    this.setState({ disableBtn: false });
    return true;
  };

  inputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validFiels);
  };

  saveEditions = async (infos) => {
    const { history } = this.props;
    history.push('/profile');
    await updateUser(infos);
  };

  render() {
    const { loaging, infos, name, email, image, description, disableBtn } = this.state;
    console.log(infos);
    return (
      <div data-testid="page-profile-edit">
        <div className="page"><h1>ProfileEdit</h1></div>
        <Header />
        { loaging ? <Carregando /> : (
          <form className="form" action="">
            <div className="container-inputs">
              <label htmlFor="image">
                Imagem de perfil:
                <input
                  data-testid="edit-input-image"
                  className="inp-profile"
                  type="text"
                  id="image"
                  name="image"
                  value={ image }
                  onChange={ this.inputChange }
                />
              </label>
            </div>
            <div className="container-inputs">
              <label htmlFor="name">
                Nome:
                <input
                  className="inp-profile"
                  data-testid="edit-input-name"
                  type="text"
                  id="name"
                  name="name"
                  value={ name }
                  onChange={ this.inputChange }
                />
              </label>
            </div>
            <div className="container-inputs">
              <label htmlFor="email">
                Email:
                <input
                  className="inp-profile"
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  value={ email }
                  id="email"
                  onChange={ this.inputChange }
                />
              </label>
            </div>
            <div className="container-inputs">
              <label htmlFor="">
                {' '}
                Descrição:
                <textarea
                  className="inp-profile"
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  id=""
                  rows="5"
                  onChange={ this.inputChange }
                />
              </label>
            </div>
            <button
              className="btn-save"
              data-testid="edit-button-save"
              type="submit"
              disabled={ disableBtn }
              onClick={ () => this.saveEditions({ name, email, description, image }) }
            >
              Salvar

            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
