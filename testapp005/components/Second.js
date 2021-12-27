import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Listitems from './Listitems';
import MyButton from './MyButton';
import Database from './Database';
export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budziki: [],
      update: false
    };
    this.next = this.next.bind(this)
    this.gett = this.gett.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
  }
  next(){
    this.props.navigation.navigate("create", {gett: this.gett})
  }
  async componentDidMount(){
    this.gett()
  }
  delete(id){
    Database.remove(id)
    // this.gett()
    let budziki = this.state.budziki
    let ananaski = budziki.filter(el => el.id != id)
    // for(let i=0; i<budziki.length; i++){
    //   if(budziki[i].id == id){
    //     budziki.splice(i, 1)
    //     console.log(budziki)
    //     console.log(i)
    //     console.log(id)
    //   }
    // }
    console.log(budziki)
    console.log(ananaski)
    this.setState({budziki: ananaski, update: true})
  }
  async gett(){
    Database.getAll().then((all) => {

      let a = JSON.parse(all)
      console.log(a.rows._array)
      this.setState({budziki: a.rows._array})
  
  })
  
  }
  update(){
    this.setState({update: false})
  }
  render(){
    return (
        <View style={{backgroundColor: "#8A2BE2", flex: 1}}>
        <ScrollView >
            <Listitems budziki={this.state.budziki} delete={this.delete} gett={this.gett} updating={this.update} update={this.state.update}/>

        </ScrollView>
        <View style={css.main}>
            <MyButton text="+" funcion={this.next} />
        </View>
        </View>
    )
}
}
let css = StyleSheet.create({
    main: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: ((Dimensions.get('window').height)- 200),
        left: ((Dimensions.get('window').width)/2 - 50)

    },
})