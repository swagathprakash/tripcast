import { View, Text, ImageBackground } from "react-native";
import React from "react";

const AttractionCard = ({ attractions }: any) => {
  return (
    <View className="">
      {attractions.map((item: any) => {
        return (
          <View
            key={item.label}
            className="overflow-hidden rounded-md relative shadow-md shadow-black my-5"
          >
            <ImageBackground
              source={item.backgroundImage}
              className="h-36"
              resizeMode="cover"
            >
              <Text
                style={{
                  textShadowColor: "#1f1e1e",
                  textShadowOffset: { height: 1, width: 1 },
                  textShadowRadius: 4,
                }}
                className="absolute text-white right-0 px-2 text-3xl font-bold bottom-2 "
              >
                {item.label}
              </Text>
            </ImageBackground>
          </View>
        );
      })}
    </View>
  );
};

export default AttractionCard;
