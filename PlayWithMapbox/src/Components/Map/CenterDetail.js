import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CenterDetail extends Component {
  render() {
    let { zoomLevel, latitude, longitude } = this.props.center
    return (
      <View style={styles.wrapper}>
        <Text>zoom: {zoomLevel}</Text>
        <Text>lat: {latitude}</Text>
        <Text>long: {longitude}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height:70,
    paddingLeft: 10,
    paddingVertical: 5
  }
});