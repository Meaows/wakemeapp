import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("cembrowski_michal_4ib1.db"); // proszę o taki schemat nazywania swojej bazy danych, zwłaszcza podczas testów na tablecie
export default class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static createTable() {
    console.log("tablica stworzona")
    db.transaction(tx => {
        tx.executeSql(
            // "CREATE TABLE IF NOT EXISTS table1 (id integer primary key not null, a text, b text);"
            "CREATE TABLE IF NOT EXISTS table1 (id INTEGER PRIMARY KEY NOT NULL, hour BOOL, pon BOOL, wt BOOL, sr BOOL, czw BOOL, pt BOOL, sob BOOL, nd BOOL);"
        );
    });
}
static add(time){
    let query = "INSERT INTO table1 (hour, pon, wt, sr, czw, pt, sob, nd) values (" + time + ", 0, 0, 0, 0, 0, 0, 0)"
    db.transaction(

        tx => {
            tx.executeSql(query);
            // tx.executeSql("INSERT INTO table1 (a, b) values ('xxx', 'yyy')",() => {}, (e) => console.log(e));
            console.log("dodano")
        },
        error => console.log(error)
              
    )
}
static getAll() {
    var query = "SELECT * FROM table1";
    //
    return new Promise((resolve, reject) => db.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {

            console.log(JSON.stringify(results))

            resolve(JSON.stringify(results));

        }, function (tx, error) {

            reject(error);

        });
    }))
}
static remove(id) {
    let ananas = "DELETE FROM table1 WHERE (id = " + JSON.stringify(id) + ");"
    db.transaction(tx => {
        tx.executeSql(
            ananas
        );
    });

}
static removeAll() {

    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM table1 ;"
        );
    });
}
static update(day, value, id){
    console.log(day)
    console.log(value)
    console.log(id)
    let ananas = "UPDATE table1 SET " + day + "=" + value + " WHERE (id = " + id + ");"
    db.transaction(tx => {
        tx.executeSql(
  
            ananas
        );
        console.log("updacior2")
        error => console.log(error)
    });
}
}
