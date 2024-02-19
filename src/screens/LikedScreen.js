import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCross, faRemove, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const LikedScreen = () => {
  const dispatch = useDispatch();

  // Get liked quotes from Redux state
  const likedQuotes = useSelector((state) => state.bookmarkedQuotes);

  console.log('Liked Quotes:', likedQuotes);

  const handleRemoveBookmark = (quote) => {
    dispatch(removeBookmark(quote));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liked Quotes</Text>
      <FlatList
        data={likedQuotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
          <View style={styles.card} >
          <View style={styles.item}>
            <Text style={styles.quote}>{`"${item.quote}"`}</Text>
            <Text style={styles.author}>{`- ${item.author}`}</Text>
          </View>
            <TouchableOpacity style={styles.icon} onPress={() => handleRemoveBookmark(item)}>
              <FontAwesomeIcon icon={faRemove} color={'#ff0000'} size={16} style={styles.icon} />
            </TouchableOpacity>
          </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 4,
    gap: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 10,
    gap: 10,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  icon: {
    marginLeft: 10,
    right: 0,
    top: 0,
    position: 'absolute',
    
    margin: 5,
  },
  quote: {
    width: '88%',
    color: '#000000',
    textAlign: 'left',
    // fontSize: 14,
    fontWeight: 'bold',
  },
  author: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'light',
    fontStyle: 'italic',
    bottom: 0,
  },
  card: {
    width: '100%',
    height: "auto",
    // justifyContent: 'center',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // borderRadius: 16,
    backgroundColor: '#e1e1e1',
    alignItems: 'start',
    gap: 10,
    flexDirection: 'row',
  },
});

export default LikedScreen;
