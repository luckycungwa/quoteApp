import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpSupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Help & Support</Text>
      {/* Add support information or contact details */}
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

export default HelpSupportScreen;
