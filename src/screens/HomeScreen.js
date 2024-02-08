import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import MainCard from '../components/MainCard'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainCard/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 30,
  },
});