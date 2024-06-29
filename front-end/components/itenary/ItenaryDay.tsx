import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import ItenaryDayHeader from "./ItenaryDayHeader";
import ItenaryBody from "./ItenaryBody";
import { useAppSelector } from "@/store";


const ItenaryDay = () => {
  const { tripDetails } = useAppSelector((state) => state.itenrary);

  const [dayIndex, setDayIndex] = useState<number>(0);
  return tripDetails ? (
    <View className="flex-1">
      <Text className="text-primary font-semibold text-3xl my-5 pt-3 mx-3">
        {tripDetails?.destination}
      </Text>
      <ItenaryDayHeader
        dayIndex={dayIndex}
        length={tripDetails?.itinerary?.length as number}
        setDayIndex={setDayIndex}
      />
      <ItenaryBody index={dayIndex} sections={tripDetails.itinerary} />
    </View>
  ) : (
    <ActivityIndicator className="my-auto" size='large' color='#1f1e1e' />
  );
};

export default ItenaryDay;
