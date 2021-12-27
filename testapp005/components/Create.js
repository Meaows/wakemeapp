import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableNativeFeedback, Vibration } from 'react-native';
import MyButton from './MyButton';
import Database from './Database';
export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "hour",
      hours: "00",
      minutes: "00"
      
    };
    this.next = this.next.bind(this)
    this.hour = this.hour.bind(this)
    this.minutes = this.minutes.bind(this)
    this.setHours = this.setHours.bind(this)
  }
  async next() {
    let time
    if(this.state.hours != "00"){
      time = this.state.hours + ":" + this.state.minutes
    }
    else{
      time = this.state.hours + ":" + this.state.minutes
    }
    
    Database.add(JSON.stringify(time))
    this.props.route.params.gett()
    this.props.navigation.navigate("budziki")
  }
  hour(){
    Vibration.vibrate(80)
    this.setState({mode: "hour"})
  }
  minutes(){
    Vibration.vibrate(80)
    this.setState({mode: "minutes"})
  }
  setHours(element){
    Vibration.vibrate(80)
    this.setState({hours: element})
  }
  render() {
    let bebe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    let drugie = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00"]

    let trzecie = ["05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "00"]

    let ananas = bebe.map((element, index) => {
      let b = (index - 2) * Math.PI / 6
      let x = (150 * Math.cos(b)) + Dimensions.get("window").width / 2.5;
      // console.log(x)
      let y = (150 * Math.sin(b)) + Dimensions.get("window").height / 3;
      // console.log(y)
      return <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
        onPress={() => {Vibration.vibrate(80)
          this.setState({hours: JSON.stringify(element)})}}
        style={{
          width: 10,
          height: 10,
        }}><View style={{
          position: 'absolute', top: y, left: x, width: 75,
          height: 75,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: '#ae00ae',
        }}><Text style={{ color: "white" }}>{element}</Text>
        </View>
      </TouchableNativeFeedback>
    }
    )
    let banan = drugie.map((element, index) => {
      let b = (index - 2) * Math.PI / 6
      let x = (80 * Math.cos(b)) + Dimensions.get("window").width / 2.3;
      // console.log(x)
      let y = (80 * Math.sin(b)) + Dimensions.get("window").height / 2.9
      // console.log(y)
      return <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
        onPress={() => {Vibration.vibrate(80)
          this.setState({hours: element})}}
        style={{
          position: 'absolute', top: y, left: x,
          width: 10,
          height: 10,
        }}><View style={{
          position: 'absolute', top: y, left: x, width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: '#ae00ae',
        }}><Text style={{ color: "white" }}>{element}</Text>
        </View>
      </TouchableNativeFeedback>
    })
    let ziemniak = trzecie.map((element, index) => {
      let b = (index - 2) * Math.PI / 6
      let x = (150 * Math.cos(b)) + Dimensions.get("window").width / 2.5;
      // console.log(x)
      let y = (150 * Math.sin(b)) + Dimensions.get("window").height / 3
      // console.log(y)
      return <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
        onPress={() => {Vibration.vibrate(80)
          this.setState({minutes: element})}}
        style={{
          position: 'absolute', top: y, left: x,
          width: 10,
          height: 10,
        }}><View style={{
          position: 'absolute', top: y, left: x, width: 75,
          height: 75,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: '#ae00ae',
        }}><Text style={{ color: "white" }}>{element}</Text>
        </View>
      </TouchableNativeFeedback>
    })

    return (
      <View style={css.main}>
        <View style={{            justifyContent: 'center',
            alignItems: 'center', flexDirection: "row"}}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
          onPress={this.hour}
          style={{
            width: 10,
            height: 10,

          }}><View style={{
            width: 75,
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,

          }}><Text style={{ color: "white", fontSize: 50}}>{this.state.hours}</Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={{ color: "white", fontSize: 50 }}>:</Text>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
          onPress={this.minutes}
          style={{
            width: 10,
            height: 10,

          }}><View style={{
            width: 75,
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,

          }}><Text style={{ color: "white", fontSize: 50 }}>{this.state.minutes}</Text>
          </View>
        </TouchableNativeFeedback>
        </View>
        {/* <Text style={{color: "white", fontSize: 50}}>Dodaj budzikasa</Text>
        <Text style={{color: "white", fontSize: 50}}>00:00</Text> */}
        {
          this.state.mode == "hour" ?
            [ananas, banan]

            :
            [ziemniak]
        }
        <View style={css.butt}>
          <MyButton text="+" funcion={this.next} />
        </View>
      </View>
    );
  }
}

let css = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#8A2BE2",
    // alignItems: "center",
    // justifyContent: "center"
  },
  butt: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: ((Dimensions.get('window').height) - 200),
    left: ((Dimensions.get('window').width) / 2 - 50)
  }
})
