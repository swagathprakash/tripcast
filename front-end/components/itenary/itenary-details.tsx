import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { getCategory } from "@/libs/utils";
import { icons } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchItinarayById, saveItinaray } from "@/store/slice/itenararySlice";

const ItenaryDetails = ({
  tripId,
}: {
  tripId?: string | string[] | undefined;
}) => {
  const dispatch = useAppDispatch();
  const { tripDetails, loading, selectedTrip } = useAppSelector((state) => state.itenrary);
  const { user, loading: userLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    tripId && dispatch(fetchItinarayById(parseInt(tripId as string)))
  }, [])
  const saveItinerary = () => {
    !loading &&
      !userLoading &&
      user &&
      user.user_id &&
      tripDetails &&
      dispatch(
        saveItinaray({ userId: user.user_id, tripDetails: tripDetails })
      );
    router.push("/create")
  };
  const tripData = tripId ? selectedTrip : tripDetails;
  return (
    <>
      {loading ? (
        <View className="my-auto">
          <ActivityIndicator className="mt-10" size='large' color='#1f1e1e' />
          <Text className="text-center text-primary">Thank you for your patience! We're currently working on creating your personalized itinerary based on your preferences and weather details. This may take a moment. Sit tight, and we'll have your itinerary ready shortly.</Text>
        </View>
      ) : tripData ? (
        <View>
          <Text className="text-4xl py-5 font-semibold text-primary px-5">
            {tripData.destination}
          </Text>
          <View className="px-3 py-5 flex-row gap-2 justify-start flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
            <View className=" w-36 my-2">
              <Text className="text-xs text-gray-400 font-medium">
                Companion
              </Text>
              <Text className="text-lg text-primary font-semibold">
                {tripData.companions}
              </Text>
            </View>
            <View className=" w-36 my-2">
              <Text className="text-xs text-gray-400 font-medium">
                Duration
              </Text>
              <Text className="text-lg text-primary font-semibold">
                {tripData.duration} days
              </Text>
            </View>
            <View className=" w-36 my-2">
              <Text className="text-xs text-gray-400 font-medium">Purpose</Text>
              <Text className="text-lg text-primary font-semibold">
                {tripData.purpose}
              </Text>
            </View>
            <View className=" w-36 my-2">
              <Text className="text-xs text-gray-400 font-medium">
                Starting location
              </Text>
              <Text className="text-lg text-primary font-semibold">
                {tripData.starting_location}
              </Text>
            </View>
          </View>
          <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300">
            <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 w-full">
              <Text className="text-lg text-primary font-semibold ">
                Weather
              </Text>
            </View>
            <View className="flex-1 overflow-hidden p-5">
              <ScrollView horizontal className="flex-1 gap-4 pl-1 pb-[5px]">
                {tripData?.forecast.map((item, index) => {
                  const category = getCategory(item.weather_code);
                  const day = new Date(item.time).getDate();
                  const month = new Date(item.time).getMonth();
                  return (
                    <View
                      key={index}
                      className="items-center justify-start pr-2"
                    >
                      <Text className="text-[10px] font-semibold text-gray-400">
                        {day + `/` + month}
                      </Text>
                      <Text className="text-xs font-semibold text-primary">
                        {item.time.split("T")[1]}
                      </Text>
                      <Image
                        className="h-10 w-10"
                        resizeMode="contain"
                        source={
                          category === "Sunny"
                            ? icons.Sunny
                            : category === "Cloudy"
                              ? icons.Cloudy
                              : category === "Rainy"
                                ? icons.Rainy
                                : icons.Thunderstorm
                        }
                      />
                      <Text
                        className={`text-center font-semibold text-[10px] text-gray-400 `}
                      >
                        {item?.weather}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
            <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
              <Text className="text-lg text-primary font-semibold">
                Itenary
              </Text>
            </View>
            <View className="py-3 px-5 flex-1 w-full ">
              <Pressable
                className="m-3 mb-5  bg-primary rounded-md shadow-md shadow-gray-500 justify-center py-2"
                onPress={() => {
                  router.push("/itenary-day");
                }}
              >
                <Text className="w-full text-center text-white text-lg font-bold">
                  View Details
                </Text>
              </Pressable>
              {!tripId && <Pressable
                className="m-3 mt-0 mb-5  bg-primary rounded-md shadow-md shadow-gray-500 justify-center py-2"
                onPress={saveItinerary}
              >
                <Text className="w-full text-center text-white text-lg font-bold">
                  Save Itinerary
                </Text>
              </Pressable>}
            </View>
          </View>
          <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
            <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
              <Text className="text-lg text-primary font-semibold">
                Packing Recommendations
              </Text>
            </View>
            <View className="py-3 px-5">
              {tripData?.packingRecommendations.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="py-1 flex-row flex-1 items-start"
                  >
                    <View className="rounded-full h-2 w-2 bg-gray-400 my-[5px] mr-1"></View>
                    <Text className="text-xs text-gray-500  font-semibold ">
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
            <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
              <Text className="text-lg text-primary font-semibold">
                Safety Tips
              </Text>
            </View>
            <View className="py-3 px-5">
              {tripData?.safetyTips.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="py-1 flex-row flex-1 items-start mr-1"
                  >
                    <View className="rounded-full h-2 w-2 bg-gray-400 my-[5px] mr-1"></View>
                    <Text className="text-xs text-gray-500  font-semibold ">
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>Trip details is not available</Text>
        </View>
      )}
    </>
  );
};

export default ItenaryDetails;
