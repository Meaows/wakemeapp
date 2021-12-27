import React, { Component } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, Touchable, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import { Animated } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import MyButton from "./MyButton"
import { Dimensions } from 'react-native';
import Database from './Database';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

// const TASK_NAME = "BACKGROUND_TASK"

// TaskManager.defineTask(TASK_NAME, () => {
//   try {
//     // fetch data here...
//     const receivedNewData = "Simulated fetch " + Math.random()
//     console.log("My task ", receivedNewData)
//     return receivedNewData
//       ? BackgroundFetch.Result.NewData
//       : BackgroundFetch.Result.NoData
//   } catch (err) {
//     return BackgroundFetch.Result.Failed
//   }
// })
export default class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: new Animated.Value(0), // początkowa wartość wysokości itema
            expanded: false, // zwinięty
            pon: css.day,
            pont: css.hidden,
            wt: css.day,
            wtt: css.hidden,
            sr: css.day,
            srt: css.hidden,
            czw: css.day,
            czwt: css.hidden,
            pt: css.day,
            ptt: css.hidden,
            sob: css.day,
            sobt: css.hidden,
            nd: css.day,
            ndt: css.hidden,
            isEnabled: false,
            isEnabled2: false,
            muzyczka: null,
            odtwarzanko: false

        };

        this.toValue = 0  // przechowanie wartości animowanej, tutaj wysokości
        this.toggle = this.toggle.bind(this)
        this.delete = this.delete.bind(this)
        this.pon = this.pon.bind(this)
        this.wt = this.wt.bind(this)
        this.sr = this.sr.bind(this)
        this.czw = this.czw.bind(this)
        this.pt = this.pt.bind(this)
        this.sob = this.sob.bind(this)
        this.nd = this.nd.bind(this)
        this.toggleSwitch = this.toggleSwitch.bind(this)
        this.toggleSwitch2 = this.toggleSwitch2.bind(this)
        this.tymek = null
        this.kasztan = null
        this.startMusic = this.startMusic.bind(this)
        this.stopMusic = this.stopMusic.bind(this)

    }
    // RegisterBackgroundTask = async () => {
    //     try {

    //             await BackgroundFetch.registerTaskAsync(TASK_NAME, {
    //                 minimumInterval: 5, // seconds,
    //               })
    //               console.log("Task registered")
            

    //     } catch (err) {
    //       console.log("Task Register failed:", err)
    //     }
    //   }
    componentDidMount(){
        if(this.props.pon == 1){
            this.setState({pon: css.daypressed, pont: css.visible})
        }
        if(this.props.wt == 1){
            this.setState({wt: css.daypressed, wtt: css.visible})
        }
        if(this.props.sr == 1){
            this.setState({sr: css.daypressed, srt: css.visible})
        }
        if(this.props.czw == 1){
            this.setState({czw: css.daypressed, czwt: css.visible})
        }
        if(this.props.pt == 1){
            this.setState({pt: css.daypressed, ptt: css.visible})
        }
        if(this.props.sob == 1){
            this.setState({sob: css.daypressed, sobt: css.visible})
        }
        if(this.props.nd == 1){
            this.setState({nd: css.daypressed, ndt: css.visible})
        }
    }
    componentDidUpdate(){
        if(this.props.update == true){
            if(this.props.pon == 1){
                this.setState({pon: css.daypressed, pont: css.visible})
            }
            else{
                this.setState({pon: css.day, pont: css.hidden})
            }
            if(this.props.wt == 1){
                this.setState({wt: css.daypressed, wtt: css.visible})
            }
            else{
                this.setState({wt: css.day, wtt: css.hidden})
            }
            if(this.props.sr == 1){
                this.setState({sr: css.daypressed, srt: css.visible})
            }
            else{
                this.setState({sr: css.day, srt: css.hidden})
            }
            if(this.props.czw == 1){
                this.setState({czw: css.daypressed, czwt: css.visible})
            }
            else{
                this.setState({czw: css.day, czwt: css.hidden})
            }
            if(this.props.pt == 1){
                this.setState({pt: css.daypressed, ptt: css.visible})
            }
            else{
                this.setState({pt: css.day, ptt: css.hidden})
            }
            if(this.props.sob == 1){
                this.setState({sob: css.daypressed, sobt: css.visible})
            }
            else{
                this.setState({sob: css.day, sobt: css.hidden})
            }
            if(this.props.nd == 1){
                this.setState({nd: css.daypressed, ndt: css.visible})
            }
            else{
                this.setState({nd: css.day, ndt: css.hidden})
            }
            this.props.updating()
        }
    }
    toggle() {

        if (!this.state.expanded) this.toValue = 50
        else this.toValue = 0

        Animated.timing(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
            duration: 400
        }).start();

        // tu zmień this.state.expanded na przeciwny
        if (this.state.expanded == true) {
            this.setState({ expanded: false })
        }
        else {
            this.setState({ expanded: true })
        }

    }
    delete(){
        this.props.delete(this.props.id)
    }
    pon(){
        let pon = this.props.pon
        if(pon == 0){
            Database.update("pon", 1, this.props.id)
            this.setState({pon: css.daypressed, pont: css.visible})
            this.props.gett()

        }
        else if(pon == 1){
            Database.update("pon", 0, this.props.id)
            this.setState({pon: css.day, pont: css.hidden})
            this.props.gett()

        }
    }
    wt(){
        let wt = this.props.wt
        if(wt == 0){
            Database.update("wt", 1, this.props.id)
            this.setState({wt: css.daypressed, wtt: css.visible})
            this.props.gett()

        }
        else if(wt == 1){
            Database.update("wt", 0, this.props.id)
            this.setState({wt: css.day, wtt: css.hidden})
            this.props.gett()

        }
    }
    sr(){
        let sr = this.props.sr
        if(sr == 0){
            Database.update("sr", 1, this.props.id)
            this.setState({sr: css.daypressed, srt: css.visible})
            this.props.gett()

        }
        else if(sr == 1){
            Database.update("sr", 0, this.props.id)
            this.setState({sr: css.day, srt: css.hidden})
            this.props.gett()

        }
    }
    czw(){
        let czw = this.props.czw
        if(czw == 0){
            Database.update("czw", 1, this.props.id)
            this.setState({czw: css.daypressed, czwt: css.visible})
            this.props.gett()

        }
        else if(czw == 1){
            Database.update("czw", 0, this.props.id)
            this.setState({czw: css.day, czwt: css.hidden})
            this.props.gett()

        }
    }
    pt(){
        let pt = this.props.pt
        if(pt == 0){
            Database.update("pt", 1, this.props.id)
            this.setState({pt: css.daypressed, ptt: css.visible})
            this.props.gett()

        }
        else if(pt == 1){
            Database.update("pt", 0, this.props.id)
            this.setState({pt: css.day, ptt: css.hidden})
            this.props.gett()

        }
    }
    sob(){
        let sob = this.props.sob
        if(sob == 0){
            Database.update("sob", 1, this.props.id)
            this.setState({sob: css.daypressed, sobt: css.visible})
            this.props.gett()

        }
        else if(sob == 1){
            Database.update("sob", 0, this.props.id)
            this.setState({sob: css.day, sobt: css.hidden})
            this.props.gett()

        }
    }
    nd(){
        let nd = this.props.nd
        if(nd == 0){
            Database.update("nd", 1, this.props.id)
            this.setState({nd: css.daypressed, ndt: css.visible})
            this.props.gett()

        }
        else if(nd == 1){
            Database.update("nd", 0, this.props.id)
            this.setState({nd: css.day, ndt: css.hidden})
            this.props.gett()

        }
    }
    toggleSwitch(){
        this.setState({isEnabled: !this.state.isEnabled})
        if(this.state.isEnabled == false){
            this.tymek = setInterval(() => { 
                let data = new Date()
                let godzina = data.getHours()
                let minuty = data.getMinutes()
                let final
                if(minuty < 10){
                    final = godzina + ":0" + minuty
                }
                else{
                    final = godzina + ":" + minuty
                }

                if(this.props.hour == final){
                    Vibration.vibrate(1000)
                }
             }, 1000);
        }
        else{
            clearInterval(this.tymek)
        }
    }
    async toggleSwitch2(){
        this.setState({isEnabled2: !this.state.isEnabled2})
        if(this.state.isEnabled2 == false){
            this.kasztan = setInterval(() => { 
                let data2 = new Date()
                let godzina2 = data2.getHours()
                let minuty2 = data2.getMinutes()
                let final2
                if(minuty2 < 10){
                    final2 = godzina2 + ":0" + minuty2
                }
                else{
                    final2 = godzina2 + ":" + minuty2
                }
                if(this.props.hour == final2){
                    if(this.state.odtwarzanko == false){
                        this.startMusic()
                    }

                    
                }
             }, 1000);
        }
        else{
            clearInterval(this.kasztan)
            console.log(this.state.odtwarzanko)
            if(this.state.odtwarzanko == true){
                this.stopMusic()
            }


        }
    }
    async startMusic(){
        const { sound } = await Audio.Sound.createAsync(require('../assets/titanic.mp3'))
        await sound.playAsync()
        this.setState({muzyczka: sound, odtwarzanko: true})
    }
    async stopMusic(){
        console.log("ananas")
        await this.state.muzyczka.stopAsync()
        this.setState({muzyczka: null, odtwarzanko: false})
    }
    render() {
        return (
            <View style={{backgroundColor: "#8A2BE2"}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 20}}>
                <Text style={{color: "white", fontSize: 40}}> {this.props.hour} </Text>
                <Switch
                        trackColor={{ false: "#767577", true: "#4B0082" }}
                        thumbColor={this.state.isEnabled ? "#ae00ae" : "#f4f3f4"}
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                    />
                                    <Switch
                        trackColor={{ false: "#767577", true: "#4B0082" }}
                        thumbColor={this.state.isEnabled2 ? "#ae00ae" : "#f4f3f4"}
                        onValueChange={this.toggleSwitch2}
                        value={this.state.isEnabled2}
                    />
                </View>
                <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: "center", margin: 20}}>
                <TouchableOpacity onPress={this.delete}>
                    <Image source={require('../assets/ananas.png')}></Image>
                </TouchableOpacity>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                    onPress={this.toggle}
                    style={{
                        width: 10,
                        height: 10,
                    }}
                >
                    <View style={{ width: 50, height: 50, justifyContent: "center", alignItems:"center" }}>
                    {
                        this.state.expanded == false ?
                            <Image source={require('../assets/gora.png')}></Image>
                            :
                            <Image source={require('../assets/dol.png')}></Image>
                    }
                    </View>
                </TouchableNativeFeedback>

                </View>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Text style={this.state.pont}>Pon </Text>
                        <Text style={this.state.wtt}>Wt </Text>
                        <Text style={this.state.srt}>Śr </Text>
                        <Text style={this.state.czwt}>Czw </Text>
                        <Text style={this.state.ptt}>Pt </Text>
                        <Text style={this.state.sobt}>Sob </Text>
                        <Text style={this.state.ndt}>Nd </Text>
                    </View>
                <Animated.View style={{

                    height: this.state.height, // animowany styl, tutaj wysokość View
                    backgroundColor: "#4B0082",

                }} >
                    {
                        <View style={css.main}>
                            <TouchableOpacity style={this.state.pon} onPress={this.pon}><Text style={{color: "white"}}>PON</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.wt} onPress={this.wt}><Text style={{color: "white"}}>WT</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.sr} onPress={this.sr}><Text style={{color: "white"}}>ŚR</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.czw} onPress={this.czw}><Text style={{color: "white"}}>CZW</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.pt} onPress={this.pt}><Text style={{color: "white"}}>PT</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.sob} onPress={this.sob}><Text style={{color: "white"}}>SOB</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.nd} onPress={this.nd}><Text style={{color: "white"}}>ND</Text></TouchableOpacity>
                        </View>

                    }
                </Animated.View>
            </View>
        );
    }
}
let css = StyleSheet.create({
    main: {
        justifyContent: "center",
        flexDirection: "row"


    },
    day: {
        margin: 5,
    },
    daypressed: {
        margin: 5,
        backgroundColor: "#ae00ae",
    },
    visible: {
        opacity: 1,
        color: "white",
        fontSize: 20
    },
    hidden: {
        opacity: 0,
        color: "white"
    }
})