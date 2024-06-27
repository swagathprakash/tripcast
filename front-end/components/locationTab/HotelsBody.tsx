import { View, Text, ScrollView } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
import { useAppSelector } from "@/store";

const Hotels = () => {
  const { places } = useAppSelector((state) => state.places);

  return <DetailsCard data={places.hotels} />;
};

export default Hotels;
