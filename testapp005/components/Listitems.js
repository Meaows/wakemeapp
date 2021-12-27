import React, { Component } from 'react';
import { View, Text, FlatList, } from 'react-native';
import ListItem from './ListItem';
import Database from './Database';
export default class Listitems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.delete = this.delete.bind(this)
    this.gett = this.gett.bind(this)
    this.update = this.update.bind(this)
  }
  delete(id){
    this.props.delete(id)
  }
  gett(){
    this.props.gett()
  }
  update(){
    this.props.updating()
  }
  render() {
    let data = this.props.budziki
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <ListItem hour={item.hour} id={item.id} delete={this.delete} pon={item.pon} wt={item.wt} sr={item.sr} czw = {item.czw} pt={item.pt} sob={item.sob} nd={item.nd} gett={this.gett} updating={this.update} update={this.props.update}></ListItem>}

        />


      </View >
    )
  }
}
