import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPlaces } from "@/store/slice/placesSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { latitude, longitude } = useAppSelector((state) => state.location);
  
  useEffect(() => {
    if (latitude && longitude) {
      dispatch(fetchPlaces({ latitude, longitude }));
    }
  }, [latitude, longitude]);
  return (
    <ScrollView className=" bg-slate-50">
      <Dashboard />
    </ScrollView>
  );
};

export default Home;
