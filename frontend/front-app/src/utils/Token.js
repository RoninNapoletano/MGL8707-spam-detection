import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
class TokenStorage {
  async saveToken(key, token) {
    try {
      if (!key) {
        console.log("Key is empty");
      } else if (!key.match(/^[\w.-]+$/)) {
        console.log("Key contains invalid characters");
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(token));
      }
    } catch (error) {
      console.log("Error while saving token: ", error);
    }
  }

  async getToken(key) {
    try {
      const token = await AsyncStorage.getItem(key);
      return JSON.parse(token);
    } catch (error) {
      console.log("Error while retrieving the token: ", error);
      return null;
    }
  }
}

export default TokenStorage;