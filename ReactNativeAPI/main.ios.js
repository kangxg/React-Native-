import React, { Component } from 'react';
import CustomerComponents, {Navigator} from 'react-native-deprecated-custom-components';
import {Container,Footer,FooterTab,Content,Button,Text,Icon,Badge} from 'native-base'
import Home from './home';
import More from './more';
export default class main extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      selectedTab:'home'
    }
  }
   render(){
     return(
       <Container>
          {this._renderContent()}
          <Footer>
            <FooterTab>
              <Button active = {this.state.selectedTab === 'home'}
                      onPress ={()=> this.setState({selectedTab:'home'})}>

                 <Icon name = 'ios-apps-outline'/>
                 <Text>首页</Text>
              </Button>
              <Button active = {this.state.selectedTab === 'more'}
                      onPress ={()=> this.setState({selectedTab:'more'})} badge vertical>

                 <Badge ><Text>2</Text></Badge>
                 <Icon name = 'ios-compass-outline'/>
                  <Text>更多</Text>
              </Button>
            </FooterTab>
          </Footer>
       </Container>
     );
   }
   _renderContent(){
     if(this.state.selectedTab ==='home')
     {
       return(<Content>
                 <Home navigator = {this.props.navigator}/>
              </Content>
       );
     }
     else if (this.state.selectedTab === 'more') {
       return(<Content>
                 <More navigator = {this.props.navigator}/>
              </Content>
       );
     }
   }
}
