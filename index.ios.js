import React, {Component} from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import {View, Text, AppRegistry, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      startTime: null,
      laps: [],
      running: false
    }
  },
  render: function() {
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper} onPress={this.handleStartPress}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.resetButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer]}>
        <ScrollView>
          {this.laps()}
        </ScrollView>
      </View>
    </View>
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight 
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}
      >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
  },
  lapButton: function() {
    return <TouchableHighlight 
      style={styles.button}
      underlayColor="gray"
      onPress={this.handleLapPress}
      >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
  },
  resetButton: function() {
    return <TouchableHighlight
      style={styles.button}
      underlayColor="gray"
      onPress={this.handleResetPress}
      >
        <Text>
          Reset
        </Text>
      </TouchableHighlight>
  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleStartPress: function() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false
      });
      return
    }
    this.setState({startTime: new Date()});
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },
  handleResetPress: function() {
    console.log("handleResetPress");
    clearInterval(this.interval);
    this.setState({
      running: false,
      timeElapsed: null,
      laps: []
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //Fill the entire Screen
    alignItems: 'stretch' 
  },
  header: {
    flex: 10
  },
  footer: { // Blue
    flex: 10
  },
  timerWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
