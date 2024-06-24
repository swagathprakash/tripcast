import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store";
import SignIn from "@/components/authentication/signIn";
import { router } from "expo-router";
import * as Location from "expo-location";
import { images } from "@/constants";

const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [location, setLocation] = useState<any>();
  console.log("location:", location);
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* <ImageBackground source={images.loginBackground}  resizeMode="contain"> */}
      <View className=" mt-3 px-5 items-end">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            router.push("/home");
          }}
        >
          <Text className="text-white font-semibold tracking-wider text-base">
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
      <SignIn />
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default AuthLayout;
