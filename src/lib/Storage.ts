import AsyncStorage from "@react-native-community/async-storage";

const LS_KEY = "@THE_ROAD_QUIZ";

export default {
  async persist<T extends {}>(value: T, path: string = "") {
    const key = `${LS_KEY}${path}`;

    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async read<T>(defaultValue: T, path: string = ""): Promise<T> {
    const key = `${LS_KEY}${path}`;
    const value = await AsyncStorage.getItem(key);

    return value !== null ? JSON.parse(value) : defaultValue;
  }
};
