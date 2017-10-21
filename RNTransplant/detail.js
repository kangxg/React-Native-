import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

export default class detail extends Component
{
  render()
  {
    return(
     <View style = {styles.container}>
        <TouchableHighlight  onPress = {this._pressBackButton.bind(this)}>
           <Text style = {styles.back}>
            返回
          </Text>
        </TouchableHighlight>
        <Text style = {styles.text}>
           {this.props.productTitle}

        </Text>
     </View>
    );
  }

  _pressBackButton(){
    const {navigator}= this.props;
    if (navigator)
    {

      navigator.pop();
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
