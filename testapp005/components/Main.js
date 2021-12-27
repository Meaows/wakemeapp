import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Database from './Database';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.next = this.next.bind(this)
  }
  next(){
    this.props.navigation.navigate("budziki")
  }
  componentDidMount(){
    Database.createTable()
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.next}
        style={css.main}
      >
        <Text style={css.text}> sqlite App </Text>
      </TouchableOpacity>
    );
  }
}
let css = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#ae00ae",
        justifyContent: "center",
        alignItems: "center",
        

    },
    text: {
        fontSize: 72,
    }
})