import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation
} from 'react-native';

export default class Animation extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      width:parseInt(this.props.width),
      height:parseInt(this.props.height),
    }
  }
  render()
  {
    return(
     <View style = {[styles.animation,{
                            width:this.state.width,
                            height:this.state.height
                          }
                        ]} >
     </View>
    );
  }
  componentDidMount()
  {
    this._startAnimation();
  }
  _startAnimation = ()=>{
    LayoutAnimation.configureNext({
      duration:1000,
      create:{
        type:LayoutAnimation.Types.spring,
        property:LayoutAnimation.Properties.scaleXY,
      },
      update:{
        type:LayoutAnimation.Types.spring
      }
    });
    this.setState({
      width:this.state.width +100,
      height:this.state.height +100
    });
  }
}

const styles = StyleSheet.create({
  animation: {
    backgroundColor:'red',

  }
});
