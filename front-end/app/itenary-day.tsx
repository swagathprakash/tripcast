import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItenaryDay from "@/components/itenary/ItenaryDay";

const ItenaryDays = () => {
  return (
    <SafeAreaView className="">
      <ScrollView className="min-h-screen ">
        <ItenaryDay />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItenaryDays;
