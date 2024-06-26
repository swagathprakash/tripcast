import { View, Text } from "react-native";
import React from "react";
import AttractionCard from "./AttractionCard";
import { images } from "@/constants";

const locationCards = [
  { label: "Attractions", backgroundImage: images.attractionsCardBg },
  { label: "Sights", backgroundImage: images.sightsCardBg },
  { label: "Shopping", backgroundImage: images.shoppingCardBg },
  { label: "Beach", backgroundImage: images.beachCardBg },
  { label: "Heritage", backgroundImage: images.heritageCardBg },
  { label: "Leisure", backgroundImage: images.leisureCardBg },
  { label: "Entertainment", backgroundImage: images.entertainnmentCardBg },
];

const LocationBody = () => {
  return (
    <>
      <View className="h-fit">
        <Text className="text-primary text-2xl font-semibold">
          Plan a perfect trip for you...
        </Text>
        <Text className="text-primary text-base font-semibold py-2">
          Get a custom itenary filled with must-dos and must-sees
        </Text>
      </View>
      <View className="my-2">
        <AttractionCard attractions={locationCards} />
      </View>
    </>
  );
};

export default LocationBody;
