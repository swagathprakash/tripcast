import { View, Text, Pressable } from "react-native";
import React from "react";

const ItenaryDayHeader = ({
  length,
  dayIndex,
  setDayIndex,
}: {
  length: number;
  dayIndex: number;
  setDayIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View className="flex-1 flex-row justify-between m-2 mb-0 bg-white items-center rounded-sm border-[1px] border-gray-200 border-b-gray-100 shadow-md shadow-gray-400">
      <Pressable
        className="py-3 w-20 border-r-[1px] border-r-gray-100"
        onPress={() => {
          setDayIndex(dayIndex - 1);
        }}
        disabled={!dayIndex}
      >
        <Text
          className={`font-medium text-sm text-center text-primary ${
            dayIndex == 0 && "text-gray-400"
          }`}
        >{`Previous`}</Text>
      </Pressable>
      <Text className="font-semibold text-lg text-primary">
        Day {dayIndex + 1}
      </Text>
      <Pressable
        className="py-3  w-20  border-l-[1px] border-l-gray-100"
        onPress={() => {
          setDayIndex(dayIndex + 1);
        }}
        disabled={dayIndex == length-1}
      >
        <Text
          className={`font-medium text-sm text-center text-primary ${
            dayIndex == length-1 && "text-gray-400"
          }`}
        >{`Next`}</Text>
      </Pressable>
    </View>
  );
};

export default ItenaryDayHeader;
