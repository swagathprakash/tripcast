import { View, Text } from "react-native";
import React from "react";
import SearchBar from "../searchBar/searchBar";
import TabBar from "../locationTab/tabBar";
import { useAppSelector } from "@/store";

const Explore = () => {
  const { latitude, longitude } = useAppSelector((state) => state.location);
  return (
    <View className="px-2 pb-2">
      <Text className="px-1 text-primary text-2xl font-semibold">Explore</Text>
      <SearchBar />
      {latitude && longitude ? (
        <TabBar />
      ) : (
        <View className="bg-white p-4 justify-center items-center border-[1px] border-gray-200 my-4 rounded-md shadow-md shadow-gray-500">
          <Text className="my-10 text-red-500 font-bold text-xs text-center">
            Please enable location or search for a location to discover the
            must-sees and must-dos
          </Text>
        </View>
      )}
    </View>
  );
};

export default Explore;
