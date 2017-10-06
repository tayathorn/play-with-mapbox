import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl'
import { Config } from '../../config'
import { AnnotationsData } from './data'
import { PostalData } from './postalData'

import * as GeoJsonHelper from '../../util/GeoJsonHelper'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

const DEFAULT_ZOOM_LEVEL = 13
const MAX_DEFAULT_ZOOM_LEVEL = 10

const CUSTOM_ANNOTATION_SIZE = 70

const NEARBY_RADIUS = 3

const initialMap = {
  zoom: 0,
  center: {
    latitude: 0,
    longitude: 0,
  },
}

// const IN_RADIUS_IMG_PATH = 'https://i.imgur.com/NyIXta7.gif'
const IN_RADIUS_IMG_PATH = require('../../images/monster/Tenter_Lion.gif')
// const OUT_RADIUS_IMG_PATH = 'https://vignette2.wikia.nocookie.net/clubpenguin/images/6/65/Forest_Pin_icon.png/revision/latest?cb=20120425094320'
const OUT_RADIUS_IMG_PATH = require('../../images/monster/Predator.png')


export default class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      annotations: [],
      isFirstTime: true,
      circlePolygon: [],
      nearbyPoints: [],
    }

    this.zoomLevel = 0
    
    this.nearbyPointsProp = []
  }

  componentDidMount() {

    this.setState({
      // annotations: AnnotationsData
      annotations: PostalData
    })
  }

  onUpdateUserLocation = (location) => {

    this.createCircleFromCenter(location)

    this.props.onUpdateUserLocation(location)

    let { latitude, longitude } = location
    if(this.state.isFirstTime) {
      this._map.setCenterCoordinateZoomLevel(latitude, longitude, DEFAULT_ZOOM_LEVEL, true)
      this.setState({
        isFirstTime: false,
      })
    }

  }

  onRegionDidChange = (location) => {
    let { zoomLevel } = location
    this.zoomLevel = zoomLevel

    if (this.props.onRegionDidChange) {
      this.props.onRegionDidChange(location)
    }

    // this.createCircleFromCenter(location)
    
  }

  createCircleFromCenter = (location) => {
    let { latitude, longitude} = location

    let center = [longitude, latitude]
    
    let circle = GeoJsonHelper.createCirclePolygon(center, NEARBY_RADIUS)

    let flipCoordsCircle = GeoJsonHelper.flipCoordinates(circle)

    let circlePolygon = [{
      coordinates: flipCoordsCircle.geometry.coordinates[0],
      type: 'polygon',
      fillAlpha:0.4,
      fillColor: '#607D8B',
      // strokeColor: '#c0392b',
      alpha: 0.4,
      id: 'circlePolygon'
    }]

    this.setState({
      circlePolygon
    }, () => {
      this.findNearbyPoints()
    })

  }

  findNearbyPoints = () => {
    let polygon = this.state.circlePolygon[0]
    let points = this.state.annotations

    let geoJsonPoints = GeoJsonHelper.convertDataPointsToGeoJsonPoints(points)
    let geoJsonPolygon = GeoJsonHelper.convertPolygonToGeoJsonPolygon(polygon)

    let nearbyPoints = GeoJsonHelper.findWithin(geoJsonPoints, geoJsonPolygon)

    console.log('nearbyPoints : ', nearbyPoints)

    this.setState({
      nearbyPoints,
    })
  }

  getAnnotation = () => {
    return this.state.annotations.map((poi) => {
      // let latitude = poi.coordinates[0]
      // let longitude = poi.coordinates[1]

      let latitude = poi.lat
      let longitude = poi.lng

      let imgSource = this.getImageSource(poi)

      let marker = {
        id: poi.id,
        latitude,
        longitude
      }

      return (
        <Annotation
          key={poi.id}
          id={poi.id}
          coordinate={{ latitude, longitude }}
          style={styles.annotation.wrapper}
        >
          <TouchableOpacity activeOpacity={1} onPress={()=>this.onSelectAnnotation(marker)}>
            <View>
              {<Image style={styles.annotation.imageSize} source={imgSource} resizeMode={'contain'} />}
            </View>
          </TouchableOpacity>
        </Annotation>
      )
    })
  }

  getImageSource = (point) => {

    // let imgSource = {uri: point.imgPath}
    let imgSource = OUT_RADIUS_IMG_PATH
    if(this.state.nearbyPoints.length > 0) {
      this.state.nearbyPoints.map((prop) => {
        if(point.id === prop.id) {
          return imgSource = IN_RADIUS_IMG_PATH
        }
      })
    }
    return imgSource
  }

  onPressAnnotation = () => {
    console.log('onpress annotation')
  }

  onPressCenterUserLocation = (location) => {

    if(location) {
      let { latitude, longitude } = location
      if(this.zoomLevel < MAX_DEFAULT_ZOOM_LEVEL) {
        this._map.setCenterCoordinateZoomLevel(latitude, longitude, DEFAULT_ZOOM_LEVEL, true)
      } else {
        this._map.setCenterCoordinate(latitude, longitude, true)
      }
    }
  }

  onSelectAnnotation = (annotation) => {
    let { id, latitude, longitude } = annotation
    console.log('onSelectAnnotation : ', {id, latitude, longitude})
  }

  onTap = () => {
    // this._map.getBounds((bounds) => {
    //   console.log('bounds : ', bounds)
    // })
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
        annotations={[...this.state.circlePolygon]}
        onTap={this.onTap}
      >
        { this.getAnnotation() }
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
      width: CUSTOM_ANNOTATION_SIZE,
      height: CUSTOM_ANNOTATION_SIZE
    }
  }
}
