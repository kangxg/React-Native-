import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Easing
} from 'react-native';

export default class AnimatedThrough extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      width:parseInt(this.props.width),
      height:parseInt(this.props.height),
      bounceValue:new Animated.Value(0),
      rotateValue: new Animated.Value(0)
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
                            },{
                              rotate:this.state.rotateValue.interpolate({
                                inputRange:[
                                  0,1
                                ],outputRange:['0deg','360deg']
                              })
                            }]
                          }
                        ]} >
                        <Image source = {require('./image/rt_4.png')}
                         style = {{width:this.state.width,
                          height:this.state.height
                          }}
                         >
                         </Image>
     </Animated.View>
    );
  }
  componentDidMount()
  {
    this._startAnimation();
  }
  _startAnimation = ()=>{
    Animated.parallel(
      [
        Animated.spring(this.state.bounceValue,{
          toValue:1
        }),
        Animated.delay(500),
        Animated.timing(
          this.state.rotateValue,{
            toValue:1,
            duration:800,
            easing:Easing.out(Easing.quad),
          })
      ]

  ).start();
  }
}

const styles = StyleSheet.create({
  animation: {
    backgroundColor:'red',

  }
});
