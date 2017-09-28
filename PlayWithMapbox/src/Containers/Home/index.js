import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Config } from '../../config'

import Map from '../../Components/Map'
import CenterDetail from '../../Components/Map/CenterDetail'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      centerMapDetail: {
        latitude: 0,
        longitude: 0,
        zoomLevel: 0
      }
    }
  }

  onRegionDidChange = (location) => {
    let { latitude, longitude, zoomLevel } = location
    this.setState({
      centerMapDetail: {
        latitude, longitude, zoomLevel
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map
          onRegionDidChange={this.onRegionDidChange}
        />
        <CenterDetail center={this.state.centerMapDetail} />
      </View>
    )
  }
}