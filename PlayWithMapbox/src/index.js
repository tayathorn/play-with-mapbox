import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Map from './Component/Map'
import Home from './Containers/Home'
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

