import { View, Text } from "react-native";
import React from "react";
import SearchBar from "../searchBar/searchBar";
import TabBar from "../locationTab/tabBar";

const Explore = () => {
  return (
    <View className="px-2 pb-2">
      <Text className="px-1 text-primary text-2xl font-semibold">Explore</Text>
      <SearchBar />
      <TabBar />

    </View>
  );
};

export default Explore;
