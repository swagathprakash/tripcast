import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/store";
import SignIn from "@/components/authentication/signIn";
import Logo from "@/components/Logo";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { storeData } from "@/libs/utils";
import { getLocationWeather, setLocation as setLocationSlice } from "@/store/slice/locationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";


const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [location, setLocation] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      storeData(user.phone);
      router.push("/home");
    }
  }, [user]);

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

  useEffect(() => {
    if (location) {
      dispatch(
        setLocationSlice({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
      dispatch(
        getLocationWeather({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          start_date: new Date().toISOString().slice(0, 10),
          end_date: new Date().toISOString().slice(0, 10),
        })
      );
    }
  }, [dispatch, location]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Logo skip={true} />
      <SignIn />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default AuthLayout;
