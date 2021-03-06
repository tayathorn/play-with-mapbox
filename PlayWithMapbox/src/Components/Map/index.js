import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl'

import Popup from '../Popup'

import { Config } from '../../config'
import { AnnotationsData } from './data'
import { PostalData } from './postalData'
import { PostalJson } from './postalJson'

import * as GeoJsonHelper from '../../util/GeoJsonHelper'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

const DEFAULT_ZOOM_LEVEL = 13
const MAX_DEFAULT_ZOOM_LEVEL = 10

const CUSTOM_ANNOTATION_SIZE = 30

const NEARBY_RADIUS = 1

const initialMap = {
  zoom: 10,
  center: {
    latitude: 0,
    longitude: 0,
  },
}

// const IN_RADIUS_IMG_PATH = 'https://i.imgur.com/NyIXta7.gif'
const IN_RADIUS_IMG_PATH = require('../../images/monster/Tenter_Lion.gif')
// const OUT_RADIUS_IMG_PATH = 'https://vignette2.wikia.nocookie.net/clubpenguin/images/6/65/Forest_Pin_icon.png/revision/latest?cb=20120425094320'
// const OUT_RADIUS_IMG_PATH = require('../../images/monster/Predator.png')
const OUT_RADIUS_IMG_PATH = require('../../images/icon/forest.png')


export default class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      annotations: [],
      isFirstTime: true,
      circlePolygon: [],
      nearbyPoints: [],
      selectedPoint: {},
      rectangleBound: []
    }

    this.zoomLevel = 0

    this.poiWithinBound = []
    this.rectangleScreenBound = []

  }

  componentDidMount() {

    this.setState({
      // annotations: AnnotationsData
      annotations: PostalData
      // annotations: PostalJson
    })
  }

  onUpdateUserLocation = (location) => {

    this.createCircleFromCenter(location)

    this.props.onUpdateUserLocation(location)

    let { latitude, longitude } = location
    if (this.state.isFirstTime) {
      this._map.setCenterCoordinateZoomLevel(latitude, longitude, DEFAULT_ZOOM_LEVEL, true)
      this.setState({
        isFirstTime: false,
      })
    } else {
      this._map.setCenterCoordinate(latitude, longitude, true)
    }
  }

  onRegionDidChange = (location) => {
    let { zoomLevel } = location
    this.zoomLevel = zoomLevel

    if (this.props.onRegionDidChange) {
      this.props.onRegionDidChange(location)
    }

    // this.getRectangleBound()

    // this.findPointWithinCurrentBound()
  }

  createCircleFromCenter = (location) => {
    let { latitude, longitude } = location

    let center = [longitude, latitude]

    let circle = GeoJsonHelper.createCirclePolygon(center, NEARBY_RADIUS)

    let flipCoordsCircle = GeoJsonHelper.flipCoordinates(circle)

    let circlePolygon = [{
      coordinates: flipCoordsCircle.geometry.coordinates[0],
      type: 'polygon',
      fillAlpha: 0.4,
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
    if(this.state.annotations.length > 0) {

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
  
        let visible = (poi.id === this.state.selectedPoint.id)
  
        return (
          <Annotation
            key={poi.id}
            id={poi.id}
            coordinate={{ latitude, longitude }}
            style={styles.annotation.wrapper}
          >
            {/*<Popup visible={visible} title={poi.zip} />*/}
            <TouchableOpacity activeOpacity={1} onPress={() => this.onSelectAnnotation(marker)}>
              <View>
                {<Image style={styles.annotation.imageSize} source={imgSource} resizeMode={'contain'} />}
              </View>
            </TouchableOpacity>
          </Annotation>
        )
      })
    }
  }

  getImageSource = (point) => {

    // let imgSource = {uri: point.imgPath}
    let imgSource = OUT_RADIUS_IMG_PATH
    if (this.state.nearbyPoints.length > 0) {
      this.state.nearbyPoints.map((prop) => {
        if (point.id === prop.id) {
          return imgSource = IN_RADIUS_IMG_PATH
        }
      })
    }
    return imgSource
  }

  getRectangleBound = () => {

    this._map.getBounds(bound => {
      console.log('bound : ', bound)

      let latitudeSW = bound[0]
      let longitudeSW = bound[1]
      let latitudeNE = bound[2]
      let longitudeNE = bound[3]

      let rectanglePolygon = [{
        coordinates: [[latitudeSW, longitudeSW], [latitudeSW, longitudeNE], [latitudeNE, longitudeNE], [latitudeNE, longitudeSW], [latitudeSW, longitudeSW]],
        type: 'polygon',
        fillAlpha: 0.4,
        fillColor: '#f44336',
        // strokeColor: '#c0392b',
        alpha: 0.4,
        id: 'rectanglePolygon'
      }]

      this.rectangleScreenBound = rectanglePolygon

      console.log('rectanglePolygon : ', ...rectanglePolygon)

      // this.setState({
      //   rectangleBound: rectanglePolygon
      // })

      this.findPointWithinCurrentBound()
    })

  }

  findPointWithinCurrentBound = () => {
    let polygon = this.rectangleScreenBound
    let points = PostalJson//this.state.annotations

    console.log('polygon : ', polygon)

    let geoJsonPoints = GeoJsonHelper.convertDataPointsToGeoJsonPoints(points)
    let geoJsonPolygon = GeoJsonHelper.convertPolygonToGeoJsonPolygon(polygon[0])

    let pointWithinBound = GeoJsonHelper.findWithin(geoJsonPoints, geoJsonPolygon)

    console.log('pointWithinBound : ', pointWithinBound)

    // this.setState({
    //   annotations: pointWithinBound
    // })
  }

  onPressCenterUserLocation = (location) => {

    if (location) {
      let { latitude, longitude } = location
      if (this.zoomLevel < MAX_DEFAULT_ZOOM_LEVEL) {
        this._map.setCenterCoordinateZoomLevel(latitude, longitude, DEFAULT_ZOOM_LEVEL, true)
      } else {
        this._map.setCenterCoordinate(latitude, longitude, true)
      }
    }
  }

  onSelectAnnotation = (annotation) => {
    let { id, latitude, longitude } = annotation
    console.log('onSelectAnnotation : ', { id, latitude, longitude })

    let annotationObj = { id, latitude, longitude }

    this.setState({
      selectedPoint: annotationObj
    })
  }

  onTap = (location) => {
    // this._map.getBounds((bounds) => {
    //   console.log('bounds : ', bounds)
    // })

    let { latitude, longitude } = location

    console.log('onTap : ', { latitude, longitude })

  }

  render() {
    // console.log('state rectangleBound : ', this.state.rectangleBound[0].coordinates)

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
        //annotations={[...this.state.circlePolygon, ...this.state.rectangleBound]}
        annotations={[...this.state.circlePolygon]}
        onTap={this.onTap}
        userTrackingMode={Mapbox.userTrackingMode.follow}
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
      width: CUSTOM_ANNOTATION_SIZE,
      height: CUSTOM_ANNOTATION_SIZE
    }
  }
}
