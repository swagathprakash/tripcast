import { View, Text } from "react-native";
import React from "react";

const DetailsCard = ({ data }: any) => {
  return data.length < 1 ? (
    <View className="flex-1">
      <Text className="text-primary text-lg text-center font-semibold my-16">Found 0 results</Text>
    </View>
  ) : (
    <View className="px-0">
      {data.map((item: any) => {
        const categories: Set<string> = new Set(
          item.categories.map((str: string) => str.split(".")).flat()
        );
        return (
          <View
            key={item.name}
            className="border-[1px] border-gray-200 min-h-32 my-1 rounded-sm shadow-md shadow-gray-100 bg-white"
          >
            <Text className="text-primary font-semibold p-3 pb-0 text-xl capitalize">
              {item.name}
            </Text>
            <Text className="text-primary font-medium pb-1 px-4 pt-1 text-xs capitalize">
              {item.city}
            </Text>
            <Text className="text-gray-500 font-medium py-3 px-4 pt-0 text-xs capitalize">
              {item.address}
            </Text>
            <View className="border-t-[1px] flex-row flex-wrap justify-start w-full border-gray-100 mt-2 py-2 mx-2">
              {Array.from(categories).map((item) => {
                return (
                  <Text
                    key={item}
                    className="py-2 px-3 text-center mx-1 border-[1px] w-fit border-gray-200 my-1 text-[10px] font-semibold text-gray-500 bg-white rounded-full"
                  >
                    {item.split('_').join(' ').toUpperCase()}
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
