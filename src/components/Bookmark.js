import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.setState({ isBookmarked: !this.state.isBookmarked })
          }
        >
          <FontAwesomeIcon
            icon={faHeart}
            color={this.state.isBookmarked ? "#ff0022" : "#f2f2f2"}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});