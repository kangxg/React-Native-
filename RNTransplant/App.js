import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';
 import More from './more';
 import Home from './home';

export default class app extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      selectedTab :'home'
    }
  }
  render()
  {
    return(

       <TabBarIOS   tintColor="red">
                  <TabBarIOS.Item // 底部导航图片\标题
                      icon = {require('./image/v2_home.png')}
                      title = '首页'
                      selected={this.state.selectedTabBarItem == 'home'}
                      onPress={()=>this.setState({selectedTabBarItem:'home'})}
                  >
                  < NavigatorIOS   initialRoute ={{
                    component:Home,
                    title:'首页',
                    barTintColor:'red',

                  }}
                  style={{flex:1}}
                  >
                  </NavigatorIOS  >
                  </TabBarIOS.Item>

                    <TabBarIOS.Item
                        icon = {require('./image/shopCart.png')}
                        title = '购物车'

                        selected = {this.state.selectedTabBarItem == 'more'} // 是否选中
                        onPress = {()=>this.setState({selectedTabBarItem:'more'})}
                    >
                    < NavigatorIOS   initialRoute ={{
                      component:More,
                      title:'购物车',
                      barTintColor:'red',
                    }}
                    style={{flex:1}}
                    >
                    </NavigatorIOS  >
                    </TabBarIOS.Item>
                </TabBarIOS>

    );
  }
}
