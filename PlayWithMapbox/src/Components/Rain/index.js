import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import Svg,{
  G,
  Path,
} from 'react-native-svg'

export default class Rain extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <Svg height={this.props.height} width={this.props.width} id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <G transform='matrix(1.25 0 0 -1.25 0 45)'>
              <Path d='M318.578-12.581c-9.387,0-18.432-1.422-26.954-4.062c-10.092,28.843-37.467,49.573-69.757,49.573 c-34.634,0-63.625-23.848-71.669-55.99c-8.579,6.485-19.137,10.479-30.731,10.479c-28.274,0-51.2-22.926-51.2-51.2 c0-6.872,1.399-13.403,3.857-19.388c-4.881,1.354-9.921,2.321-15.235,2.321C25.463-80.847,0-106.311,0-137.736 s25.463-56.889,56.889-56.889h261.689c50.267,0,91.022,40.744,91.022,91.022C409.6-53.336,368.845-12.581,318.578-12.581'
              fill='#e1e8ed' />
              <Path id='SVGCleanerId_0' d='M136.522-251.059l-1.286,38.923l-32.654-19.433 c-7.27-3.925-12.083-11.662-11.787-20.469c0.421-12.538,10.991-22.482,23.62-22.221S136.943-263.608,136.522-251.059'
              fill='#5dadec' />
              <Path d='M114.005-335.948l-1.286,38.923l-32.654-19.433c-7.27-3.925-12.083-11.662-11.787-20.469 c0.421-12.55,10.991-22.482,23.62-22.221S114.426-348.498,114.005-335.948'
              fill='#5dadec' />
              <G transform='translate(-6.979 -3)'>
                  <Path id='SVGCleanerId_0_1_' d='M57.116-285.192l-1.286,38.923l-32.654-19.433 c-7.27-3.925-12.083-11.662-11.787-20.469c0.421-12.538,10.991-22.483,23.62-22.221S57.537-297.742,57.116-285.192'
                  fill='#5dadec' />
              </G>
              <Path d='M261.916-251.059l-1.286,38.923l-32.643-19.433c-7.27-3.925-12.095-11.662-11.787-20.469 c0.421-12.538,10.98-22.482,23.62-22.221C252.439-273.996,262.337-263.608,261.916-251.059'
              fill='#5dadec' />
              <Path id='SVGCleanerId_1' d='M193.411-296.57l-1.286,38.923l-32.643-19.433 c-7.27-3.925-12.095-11.662-11.799-20.469c0.432-12.538,10.991-22.483,23.632-22.221 C183.933-319.508,193.832-309.12,193.411-296.57'
              fill='#5dadec' />
              <Path d='M250.539-347.326l-1.286,38.923l-32.643-19.433c-7.27-3.925-12.095-11.662-11.787-20.469 c0.421-12.55,10.98-22.482,23.62-22.221C241.061-370.264,250.96-359.876,250.539-347.326'
              fill='#5dadec' />
              <G transform='translate(12 1)'>
                  <Path id='SVGCleanerId_1_1_' d='M329.944-285.192l-1.286,38.923l-32.643-19.433 c-7.27-3.925-12.095-11.662-11.799-20.469c0.432-12.538,10.991-22.483,23.632-22.221 C320.466-308.13,330.365-297.742,329.944-285.192'
                  fill='#5dadec' />
              </G>
          </G>
        </Svg>
      </View>
    )
  }
}

Rain.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

Rain.defaultProps = {
  width: 50,
  height: 50
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})