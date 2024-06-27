import {
  View,
  Text,
  Pressable,
  Animated,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import TabHeader from "./tabHeader";
import TabBody from "./tabBody";
import { useAppSelector } from "@/store";

const sections = ["Location", "Hotels", "Food", "Tradition"];

const TabBar = () => {
  const { loading } = useAppSelector((state) => state.places);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  return !loading ? (
    <View className="">
      <TabHeader
        sections={sections}
        setSectionIndex={setSectionIndex}
        sectionIndex={sectionIndex}
      />
      <TabBody index={sectionIndex} />
    </View>
  ) : (
    <View className="flex-1 my-20">
      <ActivityIndicator color={"#1f1e1e"}  size={'large'}/>
    </View>
  );
};
export default TabBar;
