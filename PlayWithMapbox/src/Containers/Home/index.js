import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Config } from '../../config'

import Map from '../../Components/Map'
import CenterDetail from '../../Components/Map/CenterDetail'

import Rain from '../../Components/Rain'

const SVG_SIZE_WIDTH = 100
const SVG_SIZE_HEIGHT = 100


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

    this.currentUserLocation = null
  }

  onRegionDidChange = (location) => {
    let { latitude, longitude, zoomLevel } = location
    // this.setState({
    //   centerMapDetail: {
    //     latitude, longitude, zoomLevel
    //   }
    // })
  }

  onUpdateUserLocation = (location) => {
    this.currentUserLocation = location
  }

  onPressCenterUserLocation = () => {
    // console.log('onPressCenterUserLocation')
    this._map.onPressCenterUserLocation(this.currentUserLocation)
  }

  renderUserLocationButton = () => {
    return (
      <TouchableOpacity style={styles.userLocationButtonContainer} onPress={this.onPressCenterUserLocation}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../../images/icon/current-location.png')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    )
  }

  renderCenterDetail = () => {
    // return(
    //   <CenterDetail center={this.state.centerMapDetail} />
    // )
    return null
  }

  renderSVG = () => {
    return(
      <View style={styles.svgContainer}>
        <Rain width={SVG_SIZE_WIDTH} height={SVG_SIZE_HEIGHT}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map
          ref={map => { this._map = map }}
          onRegionDidChange={this.onRegionDidChange}
          onUpdateUserLocation={this.onUpdateUserLocation}
        />
        { this.renderCenterDetail() }
        { this.renderUserLocationButton() }
        { this.renderSVG() }
      </View>
    )
  }
}

const styles = {
  userLocationButtonContainer: {
    position: 'absolute',
    backgroundColor:'white', 
    borderRadius:25,
    bottom: 10,
    right: 10,
    padding:10,
  },
  svgContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor:'transparent', 
  }
}