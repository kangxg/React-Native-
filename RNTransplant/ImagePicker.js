import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  NativeModules,
  Image
} from 'react-native';
import deviceInfo from './DeviceInfo';
export default class ImagePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      avatarSource:null
    }
  }
  render()
  {
    return(
     <View style = {styles.container} >
     <TouchableHighlight  onPress = {this._pressBackButton.bind(this)}>
        <View style = {[styles.avatarContainer,styles.avatar]}>
            {
              this.state.avatarSource === null
              ? <Text style = {styles.text}>
                 选择图片
               </Text>:<Image style = {styles.avatar} source = {this.state.avatarSource}/>
            }

        </View>

     </TouchableHighlight>
     </View>
    );
  }
  _pressBackButton(){
    const options = {
      quality:1.0,
      maxWidth:500,
      maxHeight:500
    }
    NativeModules.ImagePicker.launchImagePicker(options,(response)=>{
      if (response.didCancel)  {
        console.log('取消选择图片');
      }
      else if (response.error)  {
        console.console.log('选择图片错误：',response.error);
      }else {
         let source = {
              uri:response.uri.replace('file://','')
         };

         this.setState({avatarSource:source});
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',

    justifyContent:'center',
    alignItems:'center'


  },
  avatarContainer:{
    justifyContent:'center',
    alignItems:'center',
    borderColor:'lightgray',
    borderWidth:2

  },
  avatar:{
    width:200,
    height:200,
    borderRadius:100,
  },
  text:{
    fontSize:20,
  },
});
