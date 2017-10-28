import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FacebookLogin } from 'react-facebook-login-component';
import geocoder from 'geocoder';
import _ from  'lodash';

import { Api } from './services';
import { fetchNetworkTokenAsync } from './services/Login';
import './App.css';
import * as configActions from './actions/configActions';
import * as pilesActions from './actions/pilesActions';
import { piles } from './piles';
import { TRASH_COMPOSITION_TYPE_LIST } from './constants/constants';

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

    const trashpoints = this.prepareData();
    this.props.pilesActions.addPiles(trashpoints);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.facebookData &&
      nextProps.facebookData.accessToken &&
      !nextProps.isSignIn
    ) {
      this.props.configActions.apiLogin();
    }
  }
  prepareData() {
    const pilesToReturn = {
      loaded: true,
      geoLoaded: false,
    };
    let geocodeIndex = [];
    const trashpoints = _.map(
      piles,
      (data) => {
        let pilesData = [];
        let toReturn = {
          country: data.country
        };
        for (const pc of data.piles) {
          let location = {
            latitude: pc.location.lat,
            longitude: pc.location.lng
          };
          const composition = _.map(pc.content, (d) => {
            d.toLowerCase();
          });
          let name = '';
          let address = '';
          if(!_.isEmpty(pc.description)) {
            const nameLength = pc.description.length < 20 ? pc.description.length : 20;
            name = pc.description.substr(0, nameLength);
            name = nameLength < 20 ? name : name + '...';
            address = pc.description;
          }
          const cl = pilesData.push({
            location: location,
            status: 'threat',
            photos: [],
            composition: _.filter(composition, (o) => {
              return TRASH_COMPOSITION_TYPE_LIST.indexOf(o) !== -1
            }),
            hashtags: [],
            amount: 'handful',
            address: address,
            name: name,
          });
          const index = cl - 1;
          if(index === 0) {
            geocodeIndex.push({
              country: data.country,
              location: location,
              index: index
            });
          }
        }
        toReturn['piles'] = pilesData;
        return toReturn;
      }
    );
    this.getAddressData(geocodeIndex);
    for(const c of trashpoints) {
      pilesToReturn[c.country] = c.piles;
    }
    return pilesToReturn;
  }
  getAddressData(geocodeIndex) {
    const lastIndex = geocodeIndex.length - 1;
    let currentIndex = geocodeIndex.length > 1 ? 0 : false;
    let interval = setInterval(function(that) {
      if (currentIndex === false || currentIndex > lastIndex) {
        that.props.pilesActions.geodataUpdated();
        return clearInterval(interval);
      }
      const indexForInterval = currentIndex;
      geocoder.reverseGeocode(
        geocodeIndex[indexForInterval].location.latitude,
        geocodeIndex[indexForInterval].location.longitude,
        function ( err, data ) {
          console.log('geocoder: ', err, data, currentIndex, indexForInterval);
          if(_.isEmpty(err) || (!_.isEmpty(data) &&  data.status === 'OK')) {
            const address = data.results[0].formatted_address ?
              data.results[0].formatted_address :
              false;
            const name = data.results[1].formatted_address ?
              data.results[1].formatted_address :
              address;
            if(name !== false && address !== false) {
              that.props.pilesActions.addGeodataToPile({
                index: indexForInterval,
                country: geocodeIndex[indexForInterval].country,
                name: name,
                address: address,
              });
            }
          } else {
            console.log(err);
          }
        }
      );
      currentIndex++;
    }, 150, this);
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
                  <strong>Data preparing for import!</strong><br />
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
    isSignIn: state.config.isSignIn,
    piles: _.pickBy(state.piles, function(value, key) {
      return Array.isArray(value);
    }),
    pilesLoaded: state.piles.loaded,
    pilesGeoLoaded: state.piles.geoLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators(configActions, dispatch),
    pilesActions: bindActionCreators(pilesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
