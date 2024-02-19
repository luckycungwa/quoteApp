import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faRefresh, faShare } from '@fortawesome/free-solid-svg-icons';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useSelector, useDispatch } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/actions';
import Bookmark from './Bookmark';

const MainCard = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);

  const cardRef = useRef();
  const dispatch = useDispatch();
  const bookmarkedQuotes = useSelector((state) => state.bookmarkedQuotes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchQuote();
    requestPermission();
    requestMediaLibraryPermission();
    requestScreenshotPermission();
  }, []);

  useEffect(() => {
    setIsBookmarked(bookmarkedQuotes.some((item) => item.quote === quote && item.author === author));
  }, [quote, author, bookmarkedQuotes]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const { content, author } = response.data;
      setQuote(content);
      setAuthor(author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const chooseBG = () => {
    const backgroundImages = [
      require('../../assets/images/01.jpg'),
      require('../../assets/images/02.jpg'),
      require('../../assets/images/03.jpg'),
    ];

    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);
  };

  const shareQuote = () => {
    try {
      const message = `"${quote}" - ${author}`;
      Share.share({
        message: message,
      });
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const requestMediaLibraryPermission = async () => {
    try {
      const granted = await MediaLibrary.requestPermissionsAsync();
      if (granted.status !== 'granted') {
        console.log('Media Library permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const requestScreenshotPermission = async () => {
    try {
      const granted = await MediaLibrary.requestPermissionsAsync();
      if (granted.status !== 'granted') {
        console.log('Screenshot permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const convertToImage = async () => {
    try {
      const result = await captureRef(cardRef, { result: 'data-uri' });
      return result;
    } catch (error) {
      console.error('Error converting to image:', error);
      return null;
    }
  };

  const saveImage = async () => {
    const imageUri = await convertToImage();
    console.log('Image URI:', imageUri);

    if (imageUri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        await MediaLibrary.createAlbumAsync('Quotes', asset, false);
        console.log('Image saved successfully');
      } catch (error) {
        console.error('Error saving image:', error);
      }
    } else {
      console.log('No image to save');
    }
  };

  const toggleBookmark = () => {
    const currentQuote = { quote, author };

    if (isBookmarked) {
      dispatch(removeBookmark(currentQuote));
    } else {
      dispatch(addBookmark(currentQuote));
    }
  };

  const refreshUI = () => {
    fetchQuote();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chooseBG}>
        <View style={styles.card} ref={cardRef}>
          {/* BACKGROUND */}
          <Image
            source={backgroundImage}
            style={styles.backgroundImage}
          />
          {/* Main Card content */}
          <View style={styles.content}>
            <Text style={styles.quotation}>{"''"}</Text>
            <Text style={styles.text}>{quote}</Text>
            <Text style={styles.author}>- {author}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bookmarkButton}>
        <Bookmark
          quote={quote}
          author={author}
          onToggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
        />
      </View>
      <View style={styles.buttonsGroup}>
        <TouchableOpacity style={styles.button} onPress={shareQuote}>
          <FontAwesomeIcon icon={faShare} color={'#f2f2f2'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={refreshUI}>
          <FontAwesomeIcon icon={faRefresh} color={'#f2f2f2'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveImage}>
          <FontAwesomeIcon icon={faDownload} color={'#f2f2f2'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  card: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 300,
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#e1e1e1',
    alignItems: 'start',
    gap: 10,
  },
  content: {
    marginVertical: 10,
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
    gap: 20,
  },
  quotation: {
    fontSize: 72,
  },
  text: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 24,
  },
  author: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'light',
    fontStyle: 'italic',
    bottom: 0,
  },
  bookmarkButton: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 0,
    padding: 10,
    margin: 20,
    backgroundColor: '#3d3d3d',
    borderRadius: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 0,
    zIndex: -1,
    borderRadius: 16,
  },
  buttonsGroup: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3a82ff',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3.5,
  },
});
