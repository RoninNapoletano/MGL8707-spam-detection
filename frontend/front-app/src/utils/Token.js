import * as SecureStore from "expo-secure-store";
class TokenStorage {
  async saveToken(key, token) {
    try {
      if (!key) {
        console.log("Key is empty");
      } else if (!key.match(/^[\w.-]+$/)) {
        console.log("Key contains invalid characters");
      } else {
        await SecureStore.setItemAsync(key, JSON.stringify(token));
      }
    } catch (error) {
      console.log("Error while saving token: ", error);
    }
  }

  async getToken(key) {
    try {
      const token = await SecureStore.getItemAsync(key);
      return JSON.parse(token);
    } catch (error) {
      console.log("Error while retrieving the token: ", error);
      return null;
    }
  }
}

export default TokenStorage;