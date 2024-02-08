import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDownload,
  faRefresh,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';

import { Permissions, ImagePicker } from "expo";
import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";

import Bookmark from "./Bookmark";

const MainCard = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const cardRef = useRef();

  useEffect(() => {
    fetchQuote();
    requestPermission();
    requestMediaLibraryPermission();
    requestScreenshotPermission();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      const { content, author } = response.data;
      setQuote(content);
      setAuthor(author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const chooseBG = () => {
    // Replace this with your list of background images
    const backgroundImages = [
      // List of images
      require("../../assets/images/01.jpg"),
      require("../../assets/images/01.jpg"),
      require("../../assets/images/02.jpg"),
      require("../../assets/images/03.jpg"),
      require("../../assets/images/04.jpg"),
      require("../../assets/images/05.jpg"),
      require("../../assets/images/06.jpg"),
      require("../../assets/images/07.jpg"),
      require("../../assets/images/08.jpg"),
      require("../../assets/images/09.jpg"),
      require("../../assets/images/10.jpg"),
    ];

    // Pick a random image from the list
    const randomImage =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);
  };

  const shareQuote = () => {
    try {
      const message = `"${quote}" - ${author}`;
      Share.share({
        message: message,
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
    }
  };

  // permisions for android
  const requestMediaLibraryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your storage to save images",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permission granted");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPermission = async () => {
    try {
      const { status } = await  MediaLibrary.requestPermissionsAsync() (
        Permissions.MEDIA_LIBRARY_WRITE_ONLY
      );
      if (status !== "granted") {
        console.log("Permission denied");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  const requestScreenshotPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Screenshot Permission",
          message: "App needs access to your storage to capture screenshots",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Screenshot permission granted");
      } else {
        console.log("Screenshot permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const convertToImage = async () => {
    try {
      if (Platform.OS === "web") {
        // For web, use Expo's takeSnapshotAsync
        const result = await captureRef(cardRef, { result: "data-uri" });
        return result;
      } else {
        // react-native-view-shot for other platforms
        const uri = await captureRef(cardRef, { format: "png", quality: 1 });
        return uri;
      }
    } catch (error) {
      console.error("Error converting to image:", error);
      return null;
    }
  };

  const saveImage = async () => {
    const imageUri = await convertToImage();
    console.log("Image URI:", imageUri);

    if (imageUri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        await MediaLibrary.createAlbumAsync("Quotes", asset, false);
        console.log("Image saved successfully");
      } catch (error) {
        console.error("Error saving image:", error);
      }
    } else {
      console.log("No image to save");
    }
  };

  return (
    <View style={styles.container}>
      
        {/* Control Buttons */}
        {/* <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.bgToggle} onPress={chooseBG}>
          <Image source={backgroundImage}  style={styles.bgImage}/>
        </TouchableOpacity>

        <View style={styles.bookmarkButton}>
          <Bookmark />
        </View>
        </View> */}
        
        
{/*  */}

<TouchableOpacity onPress={chooseBG}>
<View style={styles.bookmarkButton}>
          <Bookmark />
        </View>
        <View style={styles.card} ref={cardRef}>
        {/* BACKGROUND */}
        
        <Image
          source={backgroundImage}
          style={[
            styles.backgroundImage,
            {
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
            },
          ]}
        />
        {/* Main Card content */}
        <View style={styles.content}>
          <Text style={styles.quotation}>"</Text>
          <Text style={styles.text}>{quote}</Text>
          <Text style={styles.author}>- {author}</Text>
        </View>
       
      </View>
       </TouchableOpacity>
      {/* BUTTONS GROUP */}
      <View style={styles.buttonsGroup}>
        <TouchableOpacity style={styles.button} onPress={shareQuote}>
          <FontAwesomeIcon icon={faShare} color={"#f2f2f2"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
          <FontAwesomeIcon icon={faRefresh} color={"#f2f2f2"} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveImage}>
          <FontAwesomeIcon icon={faDownload} color={"#f2f2f2"} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,

  },
  card: {
    display: "flex",
    minWidth: 300,
    maxWidth: 300,
    minHeight: 300,
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#e1e1e1",
    alignItems: "start",
    gap: 10,
    // position: 'relative',
  },
  cardContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: 16,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    marginVertical: 10,
    alignItems: "left",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    gap: 20,
  },
  backgroundBtn: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 20,
    margin: 20,
    backgroundColor: "#3d3d3d",
    borderRadius: 16,
    padding: 0,
  },
  text: {
    color: "#000000",
    textAlign: "left",
    fontSize: 24,
  },
  author: {
    color: "#000000",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "light",
    fontStyle: "italic",
    // marginBottom: 12,
    bottom: 0,
    // justifyContent: "flex-end",
  },
  bookmarkButton: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
    padding: 10,
    margin: 20,
    backgroundColor: "#3d3d3d",
    borderRadius: 16,
  },
  bgToggle: {
    // position: "absolute",
    width: 40,
    height: 40,
    left: 0,
    top: 0,
    // padding: 10,
    margin: 20,
    borderRadius: 50,
    resizeMode: "cover",
  },
  quotation: {
    width: 40,
    height: 40,
    fontSize: 72,
    left: 0,
    top: 0,
  },
  bgImage: {
    width: 40,
    height: 40,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#1e1e1e",
    borderWidth: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 0,
    zIndex: -1,
    borderRadius: 16,
  },
  buttonsGroup: {
    position: "absolute", // Set position to absolute
    bottom: 0, // Adjust the distance from the bottom
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20, // Add horizontal padding
  },
  button: {
    backgroundColor: "#3a82ff",
    borderRadius: 50,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3.5,
  },
  controlButtons: {
    position: "absolute", // Set position to absolute
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "84%",
    zIndex: 1,
    marginBottom: 10,
  },
});
