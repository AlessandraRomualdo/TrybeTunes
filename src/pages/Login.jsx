import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import './form.css';

export default class Login extends Component {
  state = {
    userName: '',
    btnDisabled: true,
    isLoading: false,
  };

  valideBtn = () => {
    const { userName } = this.state;
    const minCaracter = 3;
    const valBtn = userName.length >= minCaracter;
    this.setState({ btnDisabled: !valBtn });
  };

  handleInputChange = async ({ target }) => {
    const { value } = target;
    this.setState({
      userName: value,
    }, this.valideBtn);
  };

  redirectTo = async () => {
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { userName, btnDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <div className="page">
          <h1>Login</h1>
        </div>
        { isLoading && <Carregando /> }
        <form className="form-login" action="">
          <label htmlFor="login-name" className="label-login">
            Entre com seu Nome ou Apelido

          </label>
          <input
            className="input-login"
            placeholder="Digite seu nome para logar"
            data-testid="login-name-input"
            type="text"
            name="userName"
            id="login-name"
            value={ userName }
            onChange={ this.handleInputChange }
          />
          <button
            className="btn-login"
            data-testid="login-submit-button"
            disabled={ btnDisabled }
            type="button"
            onClick={ () => this.redirectTo() }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
