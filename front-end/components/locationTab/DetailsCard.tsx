import { View, Text } from "react-native";
import React from "react";

const DetailsCard = ({ data }: any) => {
  return (
    <View className="px-1">
      {data.map((item: any) => {
        const categories: Set<string> = new Set(
          item.categories.map((str: string) => str.split(".")).flat()
        );
        return (
          <View
            key={item.name}
            className="border-[1px] border-gray-200 min-h-32 my-2 rounded-md shadow-md shadow-gray-400 bg-slate-50"
          >
            <Text className="text-primary font-semibold p-3 pb-0 text-2xl">
              {item.name}
            </Text>
            <Text className="text-gray-500 font-medium py-3 px-4 pt-1 text-xs">
              {item.city}
            </Text>
            <View className="border-t-[1px] flex-row flex-wrap justify-start w-full border-gray-200 mt-2 py-2">
              {Array.from(categories).map((item) => {
                return (
                  <Text className="p-2 mx-2 border-[1px] w-fit border-gray-200 my-1 text-[10px] font-semibold text-white bg-gray-700 rounded-md">
                    {item.toUpperCase()}
                  </Text>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default DetailsCard;
