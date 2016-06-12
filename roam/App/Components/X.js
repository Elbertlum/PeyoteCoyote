// JoinPool.js
'use strict';
import React, {Component} from 'react';
import {View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS} from 'react-native';
var defaultStyles = require('./Helpers/styles')
import SwipeCards from './Helpers/Cards/SwipeCards';

let roams = [];


// fetch('http://localhost:3000/roamList?email=testfsdf1@test.com&latitude=37.785834&longitude=-122.406417')
// .then( res => res = res.json() )
// .then( res => {
//   console.log('RES',res)
  // res.forEach(function(roam) {
  //   roam = roam.row[0];
  //   const dummyAttending = Math.floor(Math.random() * roam.capacity);
  //   roams.push({
  //     title: roam.title, 
  //     attending: dummyAttending, 
  //     capacity: roam.capacity,
  //     description: roam.description,
  //     marker: {
  //         title: 'Union Square',
  //         latitude: roam.creatorLatitude,
  //         longitude: roam.creatorLongitude,
  //     },
  //     region: {
  //         latitude: roam.creatorLatitude,
  //         longitude: roam.creatorLongitude,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01
  //     },
  //     date: dateFormat.formatDateTime( new Date(roam.creatorRoamStart) ),
  //     price: '$18'
  //   });
  // }); 
  
  // console.log('ROAMS!!!!!!!!!!!!!!!!!!!!!!!!!:', JSON.stringify(roams));
//})
//.catch( err => console.log('ERRRORRRRR posting object', err));

class Card extends Component{
  
  constructor(props) {
    super(props);
    console.log(props.currentRoam);
    this.state = {
      
    }
  }
  

  render() {
    return (
      <View style={styles.card}>
        
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardHeader}>{this.props.row[0].firstName}</Text>
        </View>
        
        <View style={styles.cardTimeWrap}>
          <Text style={styles.cardTimeText}>{this.props.date}</Text>
        </View>
        
        <View style={styles.userImageWrap}>
          <Image style={styles.userImage} source={this.props.row[0].picture}/>
        </View>

        
       

        <View style={styles.cardDescriptionWrap}>
          <Text style={styles.cardDescription}>{this.props.row[0].email}</Text>
        </View>
      </View>
    )
  }
}

class NoMoreCards extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  render() {
    return (
      <View>
        <Text style={[defaultStyles.header, styles.noMoreUsersText]}>No more users near you. Try again in some time</Text>
      </View>
    )
  }
}

// const roams = [
//         {
//           name: 'Jessica', 
//           description: 'EVERY WEEK PUB CRAWL SAN FRANCISCO BRINGS TOGETHER PEOPLE FROM AROUND THE WORLD TO EXPERIENCE THE ULTIMATE NIGHT OUT IN SF.',
//           image: '../../imgs/alba.jpg'
//         },
//         {
//           name: 'Jessica', 
//           description: 'EVERY WEEK PUB CRAWL SAN FRANCISCO BRINGS TOGETHER PEOPLE FROM AROUND THE WORLD TO EXPERIENCE THE ULTIMATE NIGHT OUT IN SF.',
//           image: '../../imgs/alba.jpg'
//         },
//         {
//           name: 'Jessica', 
//           description: 'EVERY WEEK PUB CRAWL SAN FRANCISCO BRINGS TOGETHER PEOPLE FROM AROUND THE WORLD TO EXPERIENCE THE ULTIMATE NIGHT OUT IN SF.',
//           image: '../../imgs/alba.jpg'
//         },
//         {
//           name: 'Jessica', 
//           description: 'EVERY WEEK PUB CRAWL SAN FRANCISCO BRINGS TOGETHER PEOPLE FROM AROUND THE WORLD TO EXPERIENCE THE ULTIMATE NIGHT OUT IN SF.',
//           image: '../../imgs/alba.jpg'
//         }
//       ];

class JoinPool extends Component {

  constructor(props) {
    console.log('token!!!!!!!', props.token);
    console.log('id!!!!!!!', props.id);
    console.log('email!!!!!!!', props.userEmail);
    super(props);
    this.state = {
      roams: roams,
      outOfCards: false
    }
  }

  componentDidMount() {
    fetch('http://107.170.251.113:3000/roamX?email=' 
         + this.props.userEmail 
         + '&&id='
         + this.props.id, {
         method: 'GET',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': this.props.token
         }
       })
       .then((response) => {
         response.json().then(result => {
           console.log('this is the data from the db: ', result);
           roams = result;
         })
       })
       .catch((error) => {
         console.log('Error handling submit:', error);
       });
  }

  handleYup (card) {
    // console.log("yupppp");
  } 
  handleNope (card) {
    console.log("nope")
  }
  cardRemoved (index, swipedRight) {
    // if (swipedRight) {
    //   this.props.navigator.push({name: 'EnrollConfirmation'});
    // } 
  }

  render() {
    return (
      <Image style={defaultStyles.backgroundImage} source={require('../../imgs/uni.jpg')}>
        <View style={defaultStyles.container}>
          <SwipeCards
            cards={this.state.roams}
            loop={false}

            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards navigator = {this.props.navigator} />}
            showYup={true}
            showNope={true}

            handleYup={this.handleYup.bind(this)}
            handleNope={this.handleNope.bind(this)}
            cardRemoved={this.cardRemoved.bind(this)}
          />
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  
  hostButton: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    backgroundColor: '#ff0066',
    borderRadius:10,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header2: {
    fontSize: 50,
    fontWeight: "100",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 3
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: 'white',
    borderRadius: 8,
    // flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 470,
    // marginTop: -100
  },

  cardTitleWrap: {
    marginTop: 20,
    marginBottom: 0
  },

  cardHeader: {
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "100",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 3
  },
  cardTimeText: {
    marginBottom: 20,
    fontSize: 17,
    fontWeight: "400",
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: 2
  },
  
  cardButton: {
    height: 50,
    width: 130,
    flexDirection: 'row',
    backgroundColor: '#ff0066',
    borderRadius:10,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 40
  },
  cardMap: {
    marginTop: -15,
    width: 300,
    height: 300
  },
  cardDescription: {
    color: 'rgb(255,255,255)',
    fontFamily: 'Gill Sans',
    textAlign: 'justify',
    letterSpacing: 0
    
  },
  icons: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    marginTop: -80,
    // marginLeft: -35,
    // flex:1,
    // flexDirection:'row',
    width: 280,
    height: 40

  },

  cardAttendingWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  cardCapacityWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  cardPriceWrap: {
    flex: 1,
    flexDirection: 'row'
  },

  participantsText: {
    fontSize:25
  },
  capacityText: {
    fontSize: 25
  },
  priceText: {
    fontSize: 25
  },

  priceIcon: {
    width: 32,
    resizeMode: 'contain',
    marginTop: -235,
    marginLeft: 7
  },
  priceTextWrap: {
    marginTop: 5,
    marginLeft: -4
  },

  participantsIcon: {
    width:18,
    resizeMode: 'contain',
    marginTop: -86,
    marginLeft: 145
  },
  participantsTextWrap: {
    marginTop: -7,
    marginLeft: -5
  },
  
  capacityIcon: {
    marginTop: -137,
    marginLeft: 200,
    width:30,
    resizeMode: 'contain',
  },
  capacityTextWrap: {
    marginTop: -20,
    marginLeft: -3
  },

  cardDescriptionWrap: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 80
    
  }, 
  cardControls: {
    // marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImageWrap: {
    marginTop: -30
  },
  userImage: { 
    width:300,
    height:300,
    resizeMode: 'cover',
    borderRadius: 10
  },
  noMoreUsersText: {
    fontSize: 40
  }


});

module.exports = JoinPool;