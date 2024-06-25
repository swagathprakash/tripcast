import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store";
import SignIn from "@/components/authentication/signIn";
import Logo from "@/components/Logo";

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
    <SafeAreaView className="flex-1 bg-white">
      <Logo />
      <SignIn />
    </SafeAreaView>
  );
};

export default AuthLayout;
