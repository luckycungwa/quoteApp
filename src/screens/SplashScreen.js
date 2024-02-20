import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Navigate to Login screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/05.jpg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default SplashScreen;
