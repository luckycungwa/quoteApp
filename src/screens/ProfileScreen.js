import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faInfo, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser, logoutUser } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ProfileScreen = () => { 
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser({
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          about: currentUser.photoURL || '',
        });
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    // Perform logout logic
    await logoutUser();
    console.log('Logging out...');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) //reset nav stack
  };
  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Image
            source={{ uri: user.about }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
          
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      )}
      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
          <FontAwesomeIcon icon={faUser} style={styles.settingIcon} />
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ChangeEmail')}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.settingIcon} />
          <Text style={styles.settingText}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('About')}>
          <FontAwesomeIcon icon={faInfo} style={styles.settingIcon} />
          <Text style={styles.settingText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('HelpSupport')}>
          <FontAwesomeIcon icon={faQuestionCircle} style={styles.settingIcon} />
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>
        {/* logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
      position: "relative",
      margin: 10,
      gap: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginBottom: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
    // marginTop: 20,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  profileEmail: {
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
  },
  settingsSection: {

    width: '100%',
    padding: 20,
    marginVertical: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingIcon: {
    marginRight: 15,
    fontSize: 20,
    color: '#555',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#fff',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
