import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { updateProfile } from '../services/AuthService';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleUpdateProfile = async () => {
    const result = await updateProfile(name, password, imageURL);

    if (result.success) {
      // Optionally, you can navigate back to the ProfileScreen or perform other actions
      console.log('Profile updated successfully');
    } else {
      // Handle update error
      console.error('Profile update error:', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
      <TextInput placeholder="New Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
      <TextInput placeholder="Image URL" value={imageURL} onChangeText={(text) => setImageURL(text)} />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfileScreen;

