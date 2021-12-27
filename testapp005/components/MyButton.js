import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.roundButton1} onPress={this.props.funcion}>
        <Text style={styles.text}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}
MyButton.propTypes = {
  funcion: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  button: {
      color: "#212121",
      textTransform: 'uppercase',
      fontFamily: "monospace",
      fontSize: 20,
  },
  touchas: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ae00ae',
  },
  text:{
    color: "#FFFFFF",
    fontSize: 45
  }
});
