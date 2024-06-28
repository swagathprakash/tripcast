import AsyncStorage from "@react-native-async-storage/async-storage";

const mobileNumberRegex = /^\d{10}$/;

const validateMobileNumber = (mobileNumber: string) => {
  return mobileNumber.match(mobileNumberRegex);
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("phone");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("phone", value);
  } catch (e) {
    // saving error
  }
}; 

const categories: { [key: string]: number[] } = {
  Sunny: [0],
  Thunderstorm: [17, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
  Rainy: [15, 16, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 80, 81, 82, 83, 84, 85],
  Cloudy: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
}

export function getCategory(weatherCode = 0 ) {
  let result='Cloudy';
  for (const category in categories) {
    if (categories[category].includes(weatherCode)) {
      result= category;
    }
  }
  return result;
}

export { validateMobileNumber, getData, storeData };
