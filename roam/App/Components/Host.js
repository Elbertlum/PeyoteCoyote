'use strict';
import React, { Component } from 'react';
const styles = require('./Helpers/styles');
const df = require('./Helpers/dateFormat');
const Confirmation = require('./Confirmation');
const {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
const Dte = require('./Dte');
const key = require('../Utils/apiKeys').places;

import {
  Image,
  DatePickerIOS,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicatorIOS,
} from 'react-native';

class Host extends Component {

  constructor (props) {
    super(props);
    this.state = {
      date: new Date(),
      flag: false,
      titleText: this.props.titleText || '',
      descText: this.props.descText || '',
      locName: this.props.locName || '',
      price: this.props.price || '',
      capacity: this.props.capacity || ''
    };
  }

nav (path) {
    this.props.navigator.push({
      name: path,
      passProps: {
        userEmail: this.props.userEmail,
        titleText: this.state.titleText,
        descText: this.state.descText,
        capacity: this.props.capacity || this.state.capacity,
        price:this.props.price || this.state.price,
        isHost: this.props.isHost,
        date: this.props.date || this.state.dateString,
        time: this.props.time || this.state.time,
        locName: this.state.locName,
        address: this.props.address,
        latitude: this.props.lat,
        longitude: this.props.lng

      }
    });
}

handleSubmit () {
  let ds = this.props.date || df.formatDate(this);
  let tm = this.props.time || df.formatTime(this);
  let dt = Date.parse(ds + ' ' + tm)

  console.log('*********', dt);
  //create the object
  let options = {
      userEmail: this.props.userEmail,
      title: this.state.titleText,
      capacity: this.state.capacity,
      description: this.state.descText,
      locName: this.state.locName,
      address: this.props.address,
      latitude: this.props.lat,
      longitude: this.props.lng,
      date: dt,
<<<<<<< bb0b5d7e895b740889b8ae7f348a29e808a6146d
      time: '2 hours', //see fetch in Time.js
=======
>>>>>>> REFACT - Move google places to location.js
      price: this.state.price,
      isHost: true,
      type: 'pool'
   }
  //make an ajax call to the database
   fetch('http://localhost:3000/roam', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  })
   .then( res => console.log('posted object'))
   .catch(err => console.log('error posting object'));
  //navigate to confirmation
  // this.nav('Confirmation')
}

onFocus () {
  this.setState({
    flag: true
  })
}

onBlur () {
  this.setState({
    flag: false
  })
}

  render () {
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    return (
      <Image style={styles.backgroundImage} source={require('../../imgs/uni.jpg')}>
      <View style={styles.hostContainer}>
      <Text style={styles.header}>Host a roam</Text>

      <TextInput
          style={styles.submit}
          autoCapitalize="none"
          placeholder={this.props.titleText ? this.props.titleText : "Enter Event Title"}
          placeholderTextColor="white"
          onChangeText={(text) => this.setState({titleText: text})}
          value={this.state.titleText}
      />
      <TouchableHighlight onPress={() => this.nav('Dte')}>
        <View style={styles.dateViewBox}>
          <View>
            <Text style={styles.dateViewLabel}>Selected Date:</Text>
          </View>
          <View>
            <Text style={styles.dateViewTime}>{this.props.date ? this.props.date:df.formatDate(this)} {this.props.time ? this.props.time:df.formatTime(this)}</Text>
          </View>
        </View>
      </TouchableHighlight>

     <TouchableHighlight onPress={() => this.nav('Location')}>
      <View style={styles.locViewBox}>
          <View>
            <Text style={styles.locViewLabel}>Pick a Location:</Text>
          </View>
          <View>
            <Text style={styles.locViewNext}>{this.props.locName} </Text>
          </View>
        </View>
    </TouchableHighlight>
    
    <View>
    <View style={styles.smallSubContainer}>
       <TextInput
          style={styles.smallSubmit}
          autoCapitalize="none"
          placeholder={this.props.price ? this.props.price : '$'}
          placeholderTextColor='white'
          autoCorrect={false}
          onChangeText={(text) => this.setState({price: text})}
        />
      </View>
      <View>
       <TextInput
          style={styles.smallSubmit}
          autoCapitalize="none"
          placeholder={this.props.capacity ? this.props.capacity : 'Capacity'}
          placeholderTextColor='white'
          autoCorrect={false}
          onChangeText={(text) => this.setState({capacity: text})}
        />
      </View>
    </View>

     <View>
      <TextInput
        style={this.state.flag ? styles.bigInput : styles.desc}
        autoCapitalize="none"
        placeholder={this.props.descText ? this.props.deskzcText : "Enter roam description"}
        autoCorrect={false}
        placeholderTextColor="white"
        onFocus = {() => this.onFocus()}
        onBlur = {() => this.onBlur()}
        multiline = {true}
        onChangeText={(text) => this.setState({descText: text})}
        value={this.state.descText}
      />
    </View>
    <View style={styles.startRoam}>
      <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSubmit()}
          underlayColor="white" >
            <Text style={styles.buttonText}> Start roam </Text>
      </TouchableHighlight>

    </View>
    </View>
      </Image>
    );
  }
}
module.exports = Host;