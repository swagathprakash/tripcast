import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@/store";
import SignIn from "@/components/authentication/signIn";
import Logo from "@/components/Logo";
import { StatusBar } from "expo-status-bar";
import { endpoints } from "@/constants";
import axios from "axios";

const getWeatherUrl = endpoints.BACKEND_URL + "/get-weather";

const AuthLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [location, setLocation] = useState<any>();

  const getLocationWeather = async () => {
    const { data }: any = await axios
      .post(getWeatherUrl, {
        latitude: 10.5167,
        longitude: 76.2167,
        start_date: "2024-06-26",
        end_date: "2024-06-26",
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data?.data?.current_weather);
  };

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
    location && getLocationWeather();
  }, [location]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Logo skip={true} />
      <SignIn />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default AuthLayout;
