import { View, Text, Pressable } from "react-native";
import React, { SetStateAction } from "react";

const TabHeader = ({
  sections,
  sectionIndex,
  setSectionIndex,
}: {
  sections: string[];
  sectionIndex: number;
  setSectionIndex: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <View className={`flex-row py-1 shadow-xl justify-between overflow-x-scroll my-3 flex-1`}>
      {sections.map((item, index) => {
        const active = sectionIndex == index;
        return (
          <Pressable
            key={index}
            className={`flex-1 items-center ${active && ""}`}
            onPress={() => {
              setSectionIndex(index);
            }}
          >
            <Text
              className={`text-primary text-base font-semibold px-2 pb-[2px] ${
                active && "text-black font-bold border-b-[1.5px] border-b-primary"
              }`}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabHeader;
