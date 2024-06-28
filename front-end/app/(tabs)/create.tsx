import { ScrollView } from "react-native";
import React from "react";
import TripPage from "@/components/trip/TripPage";

const create = () => {
  return (
    <ScrollView className='bg-slate-50'>
      <TripPage />
    </ScrollView>
  );
};

export default create;
