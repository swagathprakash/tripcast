import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="w-full p-5 pt-16 justify-start h-full">
        <Text>Home</Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
