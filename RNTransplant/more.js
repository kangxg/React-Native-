import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,

} from 'react-native';
import platform from './Platform';
import screen from './Screen';
import device from './device';
import imagePicker from './ImagePicker';

export default class more extends Component
{
  render()
  {
    return(
     <View style = {styles.container}>

        <Text style = {styles.text}>
             获取原生API：{platform.systemName}

        </Text>
        <Text style = {styles.text}>
            width:{screen.width}
        </Text>
        <Text style = {styles.text}>
            height:{screen.height}
        </Text>
        <Text style = {styles.text}>
            缩放比例:{screen.pixelRatio}
        </Text>
        <Text style = {styles.text}>
            屏幕宽度:{screen.resolutionX}
        </Text>
        <Text style = {styles.text}>
            屏幕高度:{screen.resolutionY}
        </Text>
        <TouchableHighlight  onPress = {this._pressBackButton.bind(this)}>
           <Text style = {styles.back}>
            应用信息
          </Text>
        </TouchableHighlight>
        <TouchableHighlight  onPress = {this._imageBackButton.bind(this)}>
           <Text style = {styles.back}>
            系统相册
          </Text>
        </TouchableHighlight>
     </View>
    );
  }
  _pressBackButton(){
    const {navigator}= this.props;
    if(navigator){
      navigator.push({title:'应用信息',
                      component:device,
                     });
    }
  }
  _imageBackButton(){
    const {navigator}= this.props;
    if(navigator){
      navigator.push({title:'系统相册',
                      component:imagePicker,
                     });
    }
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
