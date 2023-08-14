import * as SecureStore from "expo-secure-store";

const SECURE_STORE_KEY = "authToken";

export const getAuthToken = async () => {
  const token = await SecureStore.getItemAsync(SECURE_STORE_KEY);
  return token;
};
export const setAuthToken = async (token) => {
  await SecureStore.setItemAsync(SECURE_STORE_KEY, token);
};
export const deleteAuthToken = async () => {
  await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
};