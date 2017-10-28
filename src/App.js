import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FacebookLogin } from 'react-facebook-login-component';
import { Api } from './services';
import { fetchNetworkTokenAsync } from './services/Login';

import './App.css';
import * as configActions from './actions/configActions';

class App extends Component {
  constructor(props){
    super (props);
    this.setConfig = this.setConfig.bind(this);
    this.handleChangeApiUrl = this.handleChangeApiUrl.bind(this);
    this.handleChangeFacebookAppId = this.handleChangeFacebookAppId.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

    this.state = {
      apiUrl: '',
      facebookAppId: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.facebookData && nextProps.facebookData.accessToken && !nextProps.isSignIn) {
      this.props.configActions.apiLogin();
    }
  }
  handleChangeApiUrl(e) {
    this.setState({apiUrl: e.target.value});
  }
  handleChangeFacebookAppId(e) {
    this.setState({facebookAppId: e.target.value});
  }
  setConfig(e) {
    e.preventDefault();
    this.props.configActions.setInitialConfig(this.state.apiUrl, this.state.facebookAppId);
  }
  responseFacebook(response) {
    this.props.configActions.setFacebookData(response);
  }
  renderConfigScreen () {
    return (
      <Form onSubmit={this.setConfig}>
        <h3>Step 1 - setup configuration</h3>
        <FormGroup>
          <Label for="apiUrl">API URL</Label>
          <Input
            type="text"
            name="apiUrl"
            id="apiUrl"
            value={this.state.apiUrl}
            onChange={this.handleChangeApiUrl}
          />
          <FormText color="muted">
            Enter the full URL to the API, like http://192.168.31.169:50000/api/v1
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="facebookAppId">Facebook APP ID</Label>
          <Input
            type="text"
            name="facebookAppId"
            id="facebookAppId"
            value={this.state.facebookAppId}
            onChange={this.handleChangeFacebookAppId}
          />
          <FormText color="muted">
            Enter the Facebook App ID. For example: 135649593654536
          </FormText>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
  renderLoginFacebookScreen () {
    return (
      <div>
        <h3>Step 2 - Facebook login</h3>
        <FacebookLogin
          socialId={this.state.facebookAppId}
          language="en_US"
          scope="public_profile,email"
          responseHandler={this.responseFacebook}
          xfbml={true}
          fields="id,email,name,picture"
          version="v2.5"
          className="facebook-login"
          buttonText="Login With Facebook"
        />
      </div>
    );
  }
  renderPrepareImportScreen () {
    return (
      <div>
        <h3>Step 3 - Prepare import</h3>
        <div>
          {(() => {
            if(!this.props.isSignIn) {
              return (
                <div className="alert alert-danger fade show">
                  <strong>Please wait! Try to login</strong>
                </div>
              );
            } else {
              return (
                <div className="alert alert-success fade show">
                  <strong>Hello {this.props.facebookData.name}!</strong><br />
                  You may start import of dummy data for your account.
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Navbar color="faded" expand="md">
          <Container>
            <NavbarBrand>World Cleanup Day Dummy data importer</NavbarBrand>
          </Container>
        </Navbar>
        <Container>
          {(() => {
            if(!this.props.apiUrl || !this.props.facebookAppId) {
              return this.renderConfigScreen();
            }
            if(
              !this.props.facebookData ||
              !this.props.facebookData.name ||
              !this.props.facebookData.accessToken
            ) {
              return this.renderLoginFacebookScreen();
            }

            return this.renderPrepareImportScreen();
          })()}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiUrl: state.config.apiUrl,
    facebookAppId: state.config.facebookAppId,
    facebookData: state.config.facebookData,
    apiToken: state.config.apiToken,
    isSignIn: state.config.isSignIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators(configActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
