import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl'
import { Config } from '../../config'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

const initialMap = {
  zoom: 0,
  center: {
    latitude: 0,
    longitude: 0,
  },
}

const ZOOM_LEVEL = 12

export default class Map extends Component {

  constructor(props) {
    super(props)
  }

  onUpdateUserLocation = (location) => {

    let { latitude, longitude } = location
    this._map.setCenterCoordinateZoomLevel(latitude, longitude, ZOOM_LEVEL, true)

  }

  onRegionDidChange = (location) => {
    if(this.props.onRegionDidChange) {
      this.props.onRegionDidChange(location)
    }
  }

  render() {
    return(
      <MapView 
        ref={map => { this._map = map; }}
        style={{ flex: 1 }}
        initialZoomLevel={initialMap.zoom}
        initialCenterCoordinate={initialMap.center}
        initialDirection={0}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        zoomEnabled={true}
        showsUserLocation={true}
        styleURL={Config.map.styleUrl}
        onUpdateUserLocation={this.onUpdateUserLocation}
        onRegionDidChange={this.onRegionDidChange}
        logoIsHidden={true}
        attributionButtonIsHidden={true}
      >
        <Annotation
          id="annotation1"
          coordinate={{latitude: 13.726286, longitude: 100.5252063057}}
          style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
        >
        <View style={{width: 100, height: 100}}>
          <Image style={{width: 100, height: 100}} source={require('../../images/gif/NPC_325.gif')}/>
        </View>
        </Annotation>
      </MapView>
    )
  }
}