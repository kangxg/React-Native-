import React, { Component } from 'react';

import {
  View,

} from 'react-native';
import CustomerComponents, {Navigator} from 'react-native-deprecated-custom-components';
import Home from './home';
export default class app extends Component
{
  render()
  {
    return(
      <Navigator initialRoute ={{
        name:'home',
        component:Home
      }}
      configureScene = {(route)=>{
        return Navigator.SceneConfigs.FloatFromRight;
      }}

      renderScene ={(route,navigator)=>{
        const Component = route.component;
        return <Component {...route.params} navigator ={navigator}/>
      }}>
      </Navigator>
    );
  }
}
