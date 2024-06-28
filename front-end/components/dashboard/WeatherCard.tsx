import { View, Text, ImageBackground, ActivityIndicator, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { icons, images } from "@/constants";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { setCategory as setCategorySlice } from "@/store/slice/locationSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import locationSlice from "@/store/slice/locationSlice";
import { getCategory } from "@/libs/utils";

const WeatherCard = () => {
  const dispatch = useAppDispatch();
  const { weather, loading, location, category } = useAppSelector((state) => state.location);
  const data = [
    { label: "Rain", value: (!loading && weather?.rain) ? `${weather.rain} %` : "0 %" },
    { label: "Wind speed", value: (!loading && weather?.windspeed) ? `${weather.windspeed} km/hr` : "" },
    { label: "Humidity", value: (!loading && weather?.relativehumidity) ? `${weather.relativehumidity} %` : "" },
  ];
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  useEffect(() => {
    !loading && weather && dispatch(setCategorySlice(getCategory(weather?.weathercode)))
  }, [weather?.weathercode, loading, weather]);

  const textColor = loading ? 'text-black' : category === 'Cloudy' ? 'text-white' : category === 'Sunny' ? 'text-white' : category === 'Rainy' ? 'text-white' : 'text-white';
  return (
    <View className="bg-white flex-1 overflow-hidden rounded-md shadow-md shadow-gray-900 mx-2 my-5 h-[168px]">
      <ImageBackground
        source={!loading ? (category === 'Cloudy' ? images.Cloudy : category === 'Rainy' ? images.Rainy : category === 'Thunderstorm' ? images.Thunderstorm : images.Sunny) : images.Sunny}
        resizeMode="cover"
        className="p-3 flex-1"
        imageStyle={{ opacity: 0.9 }}
      >
        {loading ? <View className="my-auto"><ActivityIndicator className="my-auto" size='large' color='#1f1e1e' /><Text className="text-center">Loading weather</Text></View> : (
          <>
            <View className="flex-row justify-between">
              <View>
                <Text className={`font-semibold text-2xl ${textColor}`} style={styles.text}>Today   {weather?.temperature}°C</Text>
                <Text className={`font-semibold text-sm tracking-widest ${textColor}`} style={styles.text}>
                  {formattedDate}
                </Text>
                <Text className={`font-semibold text-xs ${textColor}`} style={styles.text}>
                  {location}
                </Text>
              </View>
              <View className="items-center pr-2">
                <Image className="h-16 w-16" resizeMode="contain" source={category === 'Sunny' ? icons.Sunny : category === 'Cloudy' ? icons.Cloudy : category === 'Rainy' ? icons.Rainy : icons.Thunderstorm} />
                <Text className={`text-center -top-3 font-semibold text-base ${textColor}`} style={styles.text}>
                  {weather?.weather_detail}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start gap-3 pt-3 pb-1">
              {data.map((item, index) => {
                return (
                  <View key={index}>
                    <Text className={`font-semibold text-sm ${textColor}`} style={styles.text}>
                      {item.value}
                    </Text>
                    <Text className={`font-semibold text-sm ${textColor}`} style={styles.text}>
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default WeatherCard;
const styles = StyleSheet.create({
  text: {
    textShadowColor: "#1f1e1e",
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 1,
  }
});