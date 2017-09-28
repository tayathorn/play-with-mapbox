import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl'

const accessToken = 'Access-Token'
Mapbox.setAccessToken(accessToken);

export default class Map extends Component {
  render() {
    return(
      <MapView 
        {...this.props}
      />
    )
  }
}