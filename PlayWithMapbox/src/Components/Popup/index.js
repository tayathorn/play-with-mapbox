import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Popup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      (this.props.visible) &&
      <View style={styles.container}>
        <Text style={styles.textTitle}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: -20,
    width:100,
  },

  textTitle: {
    alignSelf: 'center',
  }
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
}

Popup.defaultProps = {
  visible: true,
}