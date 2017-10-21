import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,

} from 'react-native';
import deviceInfo from './DeviceInfo';
export default class Animation extends Component
{

  render()
  {
    return(
     <View style = {styles.container} >
         <Text  style = {styles.text} >
         系统名称：{deviceInfo.systemName}
         </Text>
         <Text  style = {styles.text} >
         系统版本：{deviceInfo.systemVersion}
         </Text>
         <Text  style = {styles.text} >
         默认语言：{deviceInfo.defaultLanguage}
         </Text>
         <Text  style = {styles.text} >
         应用版本：{deviceInfo.appVersion}
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
});
