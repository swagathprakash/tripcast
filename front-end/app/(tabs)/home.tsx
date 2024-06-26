import { View, Text, ScrollView } from "react-native";
import React from "react";
import Dashboard from "@/components/dashboard/dashboard";

const Home = () => {
  return (
    <ScrollView className=' bg-white'>
      <Dashboard/>
    </ScrollView>
  );
};

export default Home;
