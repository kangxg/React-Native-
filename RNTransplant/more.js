import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,

} from 'react-native';
import platform from './Platform';
export default class more extends Component
{
  render()
  {
    return(
     <View style = {styles.container}>

        <Text style = {styles.text}>

             {platform.systemName}
        </Text>
     </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center'

  },
  text:{
    fontSize:20
  },
  back:{
    fontSize:20,
    color:'blue'
  }
});
