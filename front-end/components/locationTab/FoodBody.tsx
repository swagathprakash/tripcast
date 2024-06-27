import { View, Text } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
import { useAppSelector } from "@/store";

const Food = () => {
  const { places } = useAppSelector((state) => state.places);

  return <DetailsCard data={places.food} />;
};

export default Food;
