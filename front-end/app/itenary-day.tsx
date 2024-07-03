import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItenaryDay from "@/components/itenary/ItenaryDay";
import { useLocalSearchParams } from "expo-router";

const ItenaryDays = () => {
    const { tripId } = useLocalSearchParams();

  return (
    <SafeAreaView className="">
      <ScrollView className="min-h-screen ">
        <ItenaryDay tripId={tripId} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItenaryDays;
