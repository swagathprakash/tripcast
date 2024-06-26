import {
  View,
  Text,
  Pressable,
  Animated,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import TabHeader from "./tabHeader";
import TabBody from "./tabBody";

const sections = ["Location", "Hotels", "Food",  "Tradition"];

const TabBar = () => {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  return (
    <View className="">
      <TabHeader
        sections={sections}
        setSectionIndex={setSectionIndex}
        sectionIndex={sectionIndex}
      />
      <TabBody index={sectionIndex} />
    </View>
  );
};

export default TabBar;
