import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import { endpoints } from "@/constants";

const registerUrl = endpoints.BACKEND_URL+"/register";

const SignupCard = ({ otp, number }: { otp: string; number: string }) => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createUser = async () => {
    //need to remove below line
    router.push("/home");
    setIsLoading(true);
    const result = await axios
      .post(registerUrl, {
        otp: otp,
        phone: number,
        first_name: user.firstName,
        second_name: user.lastName,
      })
      .then((value) => {
        setIsLoading(false);
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
    return result;
  };

  return (
    <View className="flex-1 w-full justify-center px-5">
      <View className="justify-center items-start mx-1 ">
        <Text className="text-primary text-2xl font-bold mb-2 tracking-wider">
          Enter Your Details
        </Text>
      </View>
      <View className="my-1">
        <Text className="text-primary font-semibold text-base px-1 my-2">
          First Name
        </Text>
        <View
          className={`bg-white flex-row items-center px-2 rounded-md border-[1px] border-primary`}
        >
          <TextInput
            className={`font-medium px-3 duration-500 text-base  h-12  w-full text-primary ${
              user.firstName && "text-2xl tracking-widest "
            }  `}
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
        <Text className="text-primary font-semibold text-base px-1 my-2">
          Last Name
        </Text>
        <View
          className={`bg-white flex-row items-center px-2 rounded-md border-[1px] border-primary`}
        >
          <TextInput
            className={`font-medium px-3 duration-500 text-base  h-12  w-full text-primary ${
              user.lastName && "text-2xl tracking-widest "
            }  `}
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
        className={`bg-white px-2 py-2 rounded-md my-5 items-center justify-center border-[1px] border-primary `}
        onPress={() => {
          createUser();
        }}
        activeOpacity={0.8}
        disabled={!user.firstName && !user.lastName}
      >
        {!isLoading ? (
          <Text className={`text-primary tracking-widest text-xl font-bold`}>
            Register
          </Text>
        ) : (
          <ActivityIndicator size={"small"} color={"#827F75"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SignupCard;
