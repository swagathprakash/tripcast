import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { images } from "@/constants";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slice/authSlice";
import { router } from "expo-router";
import { storeData } from "@/libs/utils";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const profileData = [
    { label: "First name", value: user?.firstName },
    { label: "Last name", value: user?.lastName },
    { label: "Mobile number", value: user?.phone },
    { label: "Current location", value: "Koratty, Kerala" },
  ];

  return (
    <>
      {user ? (
        <View className="m-3 bg-white shadow-md shadow-gray-500 rounded-md ">
          <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xl font-semibold text-primary">
              Personal Details
            </Text>
            <Pressable className="  px-2  bg-white ml-10">
              <Text className="font-medium tracking-tighter text-gray-500">
                Edit
              </Text>
            </Pressable>
          </View>
          <View className="w-full  justify-start items-center flex-row py-5 px-4  ">
            <ImageBackground
              className="bg-blue-100 shadow-md shadow-gray-600 rounded-full"
              source={images.profileAvatar}
              resizeMode="cover"
            >
              <View className="h-20 w-20 border-2 rounded-full "></View>
            </ImageBackground>
          </View>
          <View className="px-3 py-5 flex-row gap-3 justify-center flex-wrap border-b-[1px] border-gray-100">
            {profileData.map((item) => {
              return (
                <View key={item.label} className=" w-36 my-2">
                  <Text className="text-xs text-gray-400 font-medium">
                    {item.label}
                  </Text>
                  <Text className="text-lg text-primary font-semibold">
                    {item.value}
                  </Text>
                </View>
              );
            })}
          </View>
          <View className="flex-1">
            <Pressable
              className="m-3 mb-5  bg-red-500 rounded-md shadow-md shadow-black justify-center py-2"
              onPress={() => {
                storeData("");
                dispatch(clearUser({}));
                router.push("/");
              }}
            >
              <Text className="w-full text-center text-white text-lg font-bold">
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="m-3 bg-white shadow-md shadow-gray-500 rounded-md ">
          <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xs font-semibold text-gray-500">
              Please login to view profile details
            </Text>
          </View>
          <View className="flex-1">
            <Pressable
              className="m-3 mb-5  bg-primary rounded-md shadow-md shadow-black justify-center py-2"
              onPress={() => {
                storeData("");
                dispatch(clearUser({}));
                router.push("/");
              }}
            >
              <Text className="w-full text-center text-white text-lg font-bold">
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      <View className="m-3 mb-10 bg-white shadow-md shadow-gray-500 rounded-md ">
        <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
          <Text className="text-xl font-semibold text-primary">
            Trip Details
          </Text>
        </View>
        <View className="h-36 p-3 items-center justify-center">
          <Text className="text-xs text-gray-500 font-semibold">
            Coming soon..
          </Text>
        </View>
      </View>
    </>
  );
};

export default ProfilePage;
