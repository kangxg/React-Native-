import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,

  TextInput,
  View,
  ScrollView,
  Platform,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl,
  Dimensions ,

} from 'react-native';
import Swiper from 'react-native-swiper';
import {Container,Header,Content,Button,Text,Item,Input,Icon,List, Body,ListItem,InputGroup,Thumbnail} from 'native-base';
import Detail from './detail';
const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2) =>r1 !== r2
});
const circleSize = 8;
const circleMargin = 5;
export default class home extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      currentPage:0,
      isRefreshing:false,
      searchText :'',
      advertisements:[
         {image:require('./image/banner.png')},
         {image:require('./image/banner02.png')},
         {image:require('./image/banner03.png')},
      ],
      products:[
        {
          image:require('./image/rt_0.png'),
          title:'商品1',
          subTitle:'描述1'
        },
        {
          image:require('./image/rt_1.png'),
          title:'商品2',
          subTitle:'描述2'
        },
        {
          image:require('./image/rt_2.png'),
          title:'商品3',
          subTitle:'描述3'
        },
        {
          image:require('./image/rt_3.png'),
          title:'商品4',
          subTitle:'描述4'
        },
        {
          image:require('./image/rt_4.png'),
          title:'商品5',
          subTitle:'描述5'
        },
        {
          image:require('./image/rt_5.png'),
          title:'商品6',
          subTitle:'描述6'
        },
        {
          image:require('./image/rt_7.png'),
          title:'商品7',
          subTitle:'描述7'
        },
        {
          image:require('./image/rt_8.png'),
          title:'商品9',
          subTitle:'描述9'
        },
        {
          image:require('./image/rt_9.png'),
          title:'商品10',
          subTitle:'描述10'
        }
      ],
    };
  }
  render()
  {
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount*2;
    const left = (Dimensions.get('window').width - indicatorWidth)/2;
    return (
       <Container>
            <Header searchBar rounded>
               <Item>
                   <Icon name="ios-search-outline" />
                   <Input placeholder="搜索商品" />
               </Item>
               <Button transparent onPress = {()=>Alert.alert('搜索内容'+this.state.searchText,null,null)}>
                   <Text>搜索</Text>
               </Button>

            </Header>
            <Content>
               <View style={styles.advertisement}>
                   <Swiper loop = {true} height = {190} autoplay = {true}>
                      {this.state.advertisements.map((advertisement,index)=>{
                        return(
                             <TouchableHighlight key ={index}  onPress = {
                             ()=>Alert.alert('你点击了轮播图',null,null)
                             }>
                               <Image style = {styles.advertisement} source =
                                {advertisement.image}
                               >
                               </Image>
                             </TouchableHighlight>
                            );
                       })}
                    </Swiper>
                </View>
                <List dataArray = {this.state.products} renderRow = {this._renderRow}>

                </List>

            </Content>
      </Container>
    );
  }
  componentDidMount()
  {
    // this._startTimer();
  }
  componentWillUnmount()
  {
    clearInterval(this.interval);
  }

  _renderSeparator(sectionID,rowID,adjacentRowHighlighted)
  {
     return(
       <View key = {`${sectionID} - ${rowID}`} style ={styles.divider} >
       </View>
     );
  }
  _renderRefreshControl()
  {
    return(
      <RefreshControl
         refreshing  ={this.state.isRefreshing}
         tintColor = {'#FF0000'}
         title = {'正在刷新，请稍后。。。'}
         onRefresh = {this._onRefresh}
         titleColor={'#0000FF'} >
      </RefreshControl>
    );
  }
  _onRefresh =()=>
  {
    this.setState({isRefreshing:true});
    setTimeout(()=>{
      const products = Array.from(new Array(10)).map(
        (value,index)=>(
          {
            image:require('./image/rt_0.png'),
            title:'新商品'+index,
            subTitle:'新商品描述'+index
          }
        )
      );
      this.setState({isRefreshing:false,dataSource:ds.cloneWithRows(products)});
    },2000);
  }
  _renderRow =(product) =>{
    return(
      <ListItem
           button
           onPress = { ()=>{
             const {navigator}= this.props;
             if(navigator){
               navigator.push({name:'detail',
                               component:Detail,
                              params:{productTitle:product.title}});
             }
           }} >
           <Thumbnail square size ={40} source = {product.image}/>
           <Body style = {{left:5,top:0,height:50}}>
             <Text  >
                 {product.title}
             </Text >
             <Text  note style = {{top:5,}}>
                 {product.subTitle}
              </Text>
           </Body>

      </ListItem>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  advertisementContent:
  {
    width:Dimensions.get('window').width,
    height:180
  },
  searchbar: {

    marginTop:Platform.OS == 'ios'
       ? 20
       :0,
    height   :40,
    flexDirection:'row'
  },
  input: {
    flex  :1,
    borderColor:'gray',
    borderRadius:10,
    borderWidth: 2,

  },
  button: {
    flex  :1,

  },
  advertisement: {
    height  :180,

  },
  products: {
    flex:1,
  },
  divider:{
    height:1,
    width:Dimensions.get('window').width-5,
    marginLeft:5,
    backgroundColor:'lightgray'
  },
  indicator:{
    position:'absolute',
    top:160,
    flexDirection:'row'
  },
  circle:{
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'gray',
    marginHorizontal:circleMargin
  },
  circleSelected:{
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'white',
    marginHorizontal:circleMargin
  },
  row: {
    height  :60,
    flexDirection:'row',
    backgroundColor:'white',
  },
  productImage:{
    width:40,
    height:40,
    marginLeft:10,
    marginRight:10,
    alignSelf: 'center',
  },
  productText:{
   flex:1,
   marginTop:3,
   marginBottom:16,
  },
  productTitle:{
    flex:3,
    marginTop:5,
    fontSize:16,
  },
  productSubTitle:{
    flex:2,
    fontSize:14,
    color:'gray',
  },
});
