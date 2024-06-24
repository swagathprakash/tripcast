import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store";
import SignIn from "@/components/authentication/signIn";

const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <SafeAreaView className="flex-1 bg-black">
        <View className=" mt-3 px-5 items-end">
          <TouchableOpacity activeOpacity={0.6}>
            <Text className="text-white font-semibold tracking-wider text-base">
              SKIP
            </Text>
          </TouchableOpacity>
        </View>
        <SignIn />
    </SafeAreaView>
  );
};

export default AuthLayout;
