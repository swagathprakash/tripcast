import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const App = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[85vh] h-full justify-center items-center w-full px-4">
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Discovers
            </Text>
            <TouchableOpacity onPress={()=>{router.push('/sign-in')}}>
              <Text>Press</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
