import { View, Text } from "react-native";
import React from "react";
import AttractionCard from "./AttractionCard";
import { images } from "@/constants";
import { useAppSelector } from "@/store";

const LocationBody = () => {
  const { places } = useAppSelector((state) => state.places);

  const locationCards = [
    places.location.attractions && {
      label: "Attractions",
      backgroundImage: images.attractionsCardBg,
    },
    places.location.sights && {
      label: "Sights",
      backgroundImage: images.sightsCardBg,
    },
    places.location.shopping && {
      label: "Shopping",
      backgroundImage: images.shoppingCardBg,
    },
    places.location.beach && {
      label: "Beach",
      backgroundImage: images.beachCardBg,
    },
    places.location.heritage && {
      label: "Heritage",
      backgroundImage: images.heritageCardBg,
    },
    places.location.leisure && {
      label: "Leisure",
      backgroundImage: images.leisureCardBg,
    },
    places.location.entertainment && {
      label: "Entertainment",
      backgroundImage: images.entertainnmentCardBg,
    },
  ].filter(Boolean);

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
