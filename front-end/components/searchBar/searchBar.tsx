import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { TOMTOM_API_KEY } from "@/constants/tomtom";
import axios from "axios";
import Suggestion from "../Suggestion";
import { Entypo } from "@expo/vector-icons";
import {
  getLocationWeather,
  setLocation as setLocationSlice,
} from "@/store/slice/locationSlice";
import { useAppDispatch } from "@/store";
import { fetchPlaces } from "@/store/slice/placesSlice";
import * as Location from "expo-location";

const SearchBar = () => {
  const [location, setLocation] = useState<{
    address: string;
    lat: number;
    lon: number;
  }>();
  const [answers, setAnswers] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location) {
      dispatch(
        setLocationSlice({
          latitude: location.lat,
          longitude: location.lon,
        })
      );
      dispatch(
        getLocationWeather({
          latitude: location.lat,
          longitude: location.lon,
          start_date: new Date().toISOString().slice(0, 10),
          end_date: new Date().toISOString().slice(0, 10),
        })
      );
      dispatch(
        fetchPlaces({ latitude: location.lat, longitude: location.lon })
      );
    }
  }, [location]);
  let [suggestionListData, setSuggestionListData] = useState<
    Array<{
      p1: string | null;
      p2: string | null;
      p3: string | null;
      address: string;
      lat: number;
      lon: number;
    }>
  >([]);
  let [placeholder, setPlaceholder] = useState("Search for destination");
  let [showList, setShowList] = useState(false);

  const onPressItem = (item: { address: React.SetStateAction<string> }) => {
    setPlaceholder(item.address);
    setShowList(false);
  };

  const handleSearchTextChange = (changedSearchText: string) => {
    if (!changedSearchText || changedSearchText.length < 3) return;

    let baseUrl = `https://api.tomtom.com/search/2/search/${changedSearchText}.json?`;
    let searchUrl = baseUrl + `key=${TOMTOM_API_KEY}`;

    axios
      .get(searchUrl)
      .then((response) => {
        let addresses = response.data.results.map(
          (v: {
            address: { freeformAddress: string };
            position: { lat: number; lon: number };
          }) => {
            let parts = v.address.freeformAddress.split(",");
            return {
              p1: parts.length > 0 ? parts[0] : null,
              p2: parts.length > 1 ? parts[1] : null,
              p3: parts.length > 2 ? parts[2] : null,
              address: v.address.freeformAddress,
              lat: v.position.lat,
              lon: v.position.lon,
            };
          }
        );

        setSuggestionListData(addresses);
        setShowList(true);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setPlaceholder("Search for destination");
    setLocation({
      lat: currentLocation.coords.latitude,
      lon: currentLocation.coords.longitude,
      address: "",
    });
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <View className="flex-1 flex-row mb-1 mt-3">
      <Suggestion
        placeholder={placeholder}
        showList={showList}
        suggestionListData={suggestionListData}
        onPressItem={onPressItem}
        handleSearchTextChange={handleSearchTextChange}
        setAnswers={setAnswers}
        setLocation={setLocation}
      />
      <Pressable
        className=" bg-white border-[1px] border-gray-300 text-primary w-fit py-2 px-[10px] rounded-md h-fit self-start"
        onPress={() => {
          getPermissions();
        }}
        disabled={!answers}
      >
        <Entypo name="location-pin" size={28} color="#1f1e1e" />
      </Pressable>
    </View>
  );
};

export default SearchBar;
