import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated
} from 'react-native';

export default class Animateds extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      width:parseInt(this.props.width),
      height:parseInt(this.props.height),
      bounceValue:new Animated.Value(0)
    }
  }
  render()
  {
    return(
     <Animated.View style = {[styles.animation,{
                            width:this.state.width,
                            height:this.state.height,
                            transform:[{
                              scale:this.state.bounceValue
                            }]
                          }
                        ]} >
     </Animated.View>
    );
  }
  componentDidMount()
  {
    this._startAnimation();
  }
  _startAnimation = ()=>{
    Animated.spring(this.state.bounceValue,{
      toValue:1
    }).start();
  }
}

const styles = StyleSheet.create({
  animation: {
    backgroundColor:'red',

  }
});
