import { View, Text } from "react-native";
import React from "react";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView>
      <View className="bg-black w-full h-16">
        <Text className="text-red-500">SignsIn</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
