import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import Location from "./LocationBody";
import Hotels from "./HotelsBody";
import Food from "./FoodBody";
import Tradition from "./TraditionBody";

const TabBody = ({ index, sections }: { index: number; sections: React.JSX.Element[] }) => {
  const currentIndex = index;
  const ref = useRef<FlatList>(null);
  useEffect(() => {
    ref.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  }, [index]);
  
  return (
    <FlatList
      ref={ref}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={index}
      className=""
      horizontal
      data={sections}
      renderItem={({ item, index }) => {
        const BodyIndex = index;
        const selection = BodyIndex !== currentIndex;
        return (
          <View
            className={` w-[90vw] min-h-[74vh] mx-1 my-2 overflow-scroll ${selection && "max-h-[74vh]"
              }`}
          >
            {item}
          </View>
        );
      }}
    />
  );
};

export default TabBody;
