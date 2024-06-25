import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const SignupCard = () => {
  const [user, setUser] = useState<any>({});
  return (
    <View className="flex-1 w-full justify-center px-5">
      <View className="justify-center items-start mx-1 ">
        <Text className="text-white text-2xl font-bold mb-2 tracking-wider">
          Enter Your Details
        </Text>
      </View>
      <View className="my-1">
        <Text className="text-white font-semibold text-base px-1 my-2">
          First Name
        </Text>
        <View className={`bg-white flex-row items-center px-2 rounded-md`}>
          <TextInput
            className={`font-medium px-3 duration-500 text-base  h-12  w-full text-black ${user.firstName && 'text-2xl tracking-widest '}  `}
            value={user.firstName}
            onChangeText={(e: any) => {
              setUser({ ...user, firstName: e });
            }}
            placeholder="Enter first name"
            placeholderTextColor={"#b5b5b5"}
          />
        </View>
      </View>
      <View className="my-1 mb-5">
        <Text className="text-white font-semibold text-base px-1 my-2">
          Last Name
        </Text>
        <View className={`bg-white flex-row items-center px-2 rounded-md`}>
          <TextInput
            className={`font-medium px-3 duration-500 text-base  h-12  w-full text-black ${user.lastName && 'text-2xl tracking-widest '}  `}
            value={user.lastName}
            onChangeText={(e: any) => {
              setUser({ ...user, lastName: e });
            }}
            placeholder="Enter last name"
            placeholderTextColor={"#b5b5b5"}
          />
        </View>
      </View>
      <TouchableOpacity
          className={`bg-white px-2 py-2 rounded-md my-5 items-center justify-center `}
          onPress={() => {
            router.push('/home')
            //validate otp here
            //   const result = validateMobileNumber(number);
            
          }}
          activeOpacity={0.8}
          disabled={!user.firstName && !user.lastName}
        >
          <Text className={`text-black tracking-widest text-2xl font-bold`}>
            CONTINUE
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default SignupCard;
