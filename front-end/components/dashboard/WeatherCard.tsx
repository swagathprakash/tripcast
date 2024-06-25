import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { images } from "@/constants";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const WeatherCard = () => {
  const data = [
    { label: "Rain", value: "22%" },
    { label: "Wind speed", value: "12 km/h" },
    { label: "Humidity", value: "22%" },
  ];
  return (
    <View className="bg-white flex-1 overflow-hidden rounded-md shadow-md shadow-gray-900 mx-2 my-5">
      <ImageBackground
        source={images.weatherBg}
        resizeMode="cover"
        className="p-3"
        imageStyle={{ opacity: 0.9 }}
      >
        <View className="flex-row justify-between ">
          <View>
            <Text className="text-white font-semibold text-2xl">Today</Text>
            <Text className="text-white font-semibold text-sm tracking-widest ">
              Monday June 24
            </Text>
            <Text className="text-white font-semibold text-xs">
              Koratty, Kerala
            </Text>
          </View>
          <View className="items-center pr-2">
            <View className="bg-blue-300 h-16 w-16"></View>
            <Text className="text-center pt-1 text-white font-semibold text-base">
              Mostly Cloudy
            </Text>
          </View>
        </View>
        <View className="flex-row justify-start gap-3 pt-3 pb-1">
          {data.map((item, index) => {
            return (
              <View key={index}>
                <Text className="text-white font-semibold text-sm">
                  {item.value}
                </Text>
                <Text className="text-white font-semibold text-xs">
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherCard;
