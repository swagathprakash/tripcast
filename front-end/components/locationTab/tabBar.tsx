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


const TabBar = ({ sectionLabel, sectionBody, page }: { sectionLabel: string[]; sectionBody: React.JSX.Element[]; page: string }) => {
  const { loading } = useAppSelector((state) => state.places);
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  return (page === 'explore' && !loading) || page === 'plan' || page === 'saved' ? (
    <View className="">
      <TabHeader
        sections={sectionLabel}
        setSectionIndex={setSectionIndex}
        sectionIndex={sectionIndex}
      />
      <TabBody index={sectionIndex} sections={sectionBody} />
    </View>
  ) : (
    <View className="flex-1 my-20">
      <ActivityIndicator color={"#1f1e1e"} size={'large'} />
    </View>
  );
};
export default TabBar;
