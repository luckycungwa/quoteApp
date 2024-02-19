import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/actions';

const Bookmark = ({ quote, author, onToggleBookmark, isBookmarked }) => {
  return (
    <View>
      <TouchableOpacity onPress={onToggleBookmark}>
        <FontAwesomeIcon icon={faHeart} color={isBookmarked ? '#ff0000' : '#f2f2f2'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Bookmark;
