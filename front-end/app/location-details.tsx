import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store";
import DetailsCard from "@/components/locationTab/DetailsCard";

const LocationDetails = () => {
  const { section } = useLocalSearchParams();
  const { places } = useAppSelector((state) => state.places);
  let data = undefined;

  switch (section) {
    case "Sights":
      data = places.location.sights;
      break;
    case "Attractions":
      data = places.location.attractions;
      break;
    case "Beach":
      data = places.location.beach;
      break;
    case "Entertainment":
      data = places.location.entertainment;
      break;
    case "Heritage":
      data = places.location.heritage;
      break;
    case "Leisure":
      data = places.location.leisure;
      break;
    case "Shopping":
      data = places.location.shopping;
      break;
  }

  return (
    <SafeAreaView className="bg-white">
      <View className=" border-b-[1px] border-b-gray-300">
        <Text className="text-3xl mt-8 mx-5 mb-3">{section}</Text>
      </View>
      <ScrollView className=" min-h-[85vh] px-2 py-2 bg-blue-50">
        <DetailsCard data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetails;
