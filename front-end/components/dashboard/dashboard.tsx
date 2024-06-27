import { View, Text } from "react-native";
import React from "react";
import WeatherCard from "./WeatherCard";
import Explore from "./explore";
import { useAppSelector } from "@/store";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <View className=" w-full px-2">
      <Text className="p-4 pb-1 text-gray-600 text-sm font-medium">
        Hi, {user?.firstName}
      </Text>
      <Text className="p-4 pb-2 pt-0 text-primary text-base font-semibold">
        Welcome to TripCast
      </Text>

      <WeatherCard />
      <Explore />
    </View>
  );
};

export default Dashboard;
