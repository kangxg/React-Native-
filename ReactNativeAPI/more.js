import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text

} from 'react-native';
export default class main extends Component {
   render(){
     return(
       <View style = {styles.container}>
          <Text style = {styles.text}>
            更多页面
          </Text>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'

  },
    text:{
      fontSize:20,
      marginTop:100,
    }
  }
);
