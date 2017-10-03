import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl'
import { Config } from '../../config'
import { Annotations } from './data'

import Rain from '../Rain'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

const ZOOM_LEVEL = 13

const initialMap = {
  zoom: 0,
  center: {
    latitude: 0,
    longitude: 0,
  },
}


export default class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      annotations: [],
      isFirstTime: true
    }
  }

  componentDidMount() {

    // this.setState({
    //   annotations: Annotations
    // })
  }

  onUpdateUserLocation = (location) => {

    this.props.onUpdateUserLocation(location)

    let { latitude, longitude } = location
    if(this.state.isFirstTime) {
      this._map.setCenterCoordinateZoomLevel(latitude, longitude, ZOOM_LEVEL, true)
      this.setState({
        isFirstTime: false,
      })
    }

  }

  onRegionDidChange = (location) => {
    if (this.props.onRegionDidChange) {
      this.props.onRegionDidChange(location)
    }
  }

  onFinishLoadingMap = () => {
    this.setState({
      annotations: Annotations
    })
  }

  getAnnotation = () => {
    return this.state.annotations.map((poi) => {
      let latitude = poi.coord.lat
      let longitude = poi.coord.long
      // let imgSource = require(poi.imgPath)
      let imgSource = { uri: poi.imgPath }
      return (
        <Annotation
          key={poi.id}
          id={poi.id}
          coordinate={{ latitude, longitude }}
          style={styles.annotation.wrapper}
        >
          <View>
            {<Image style={styles.annotation.imageSize} source={imgSource} resizeMode={'contain'} />}
            {/*<Rain/>*/}
          </View>
        </Annotation>
      )
    })
  }

  onPressCenterUserLocation = (location) => {

    if(location) {
      let { latitude, longitude } = location
      this._map.setCenterCoordinate(latitude, longitude, true)
    }
  }

  onSelectAnnotation = (annotation) => {
    console.log('onSelectAnnotation : ', annotation)
  }

  render() {
    return (
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
        onOpenAnnotation={this.onSelectAnnotation}
        onFinishLoadingMap={this.onFinishLoadingMap}
      >
        {this.getAnnotation()}
      </MapView>
    )
  }
}

const styles = {
  annotation: {
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute'
    },
    imageSize: {
      width: 50,
      height: 50
    }
  }
}
