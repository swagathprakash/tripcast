import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { validateMobileNumber } from "@/libs/utils";

const LoginMobile = ({
  disabled,
  number,
  setNumber,
  error,
  setError,
}: {
  number: string;
  disabled:boolean;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View className="my-1 w-full">
      <View className={`bg-white flex-row items-center px-2 rounded-md  ${error && 'border-[1px] border-red-500'} `}>
        <View className="px-2  border-r-[2px] border-r-gray-200 py-2">
          <Text className={`font-medium text-2xl ${error ? 'text-red-500':'text-black'}`}>+91</Text>
        </View>
        <TextInput
        keyboardType="numeric"
          className={`font-medium px-3 text-base duration-500 text-black   ${
            number && " text-2xl px-2 tracking-[4]"
          } ${error && "text-red-500"}`}
          value={number}
          onChangeText={(e: any) => {
            setError(false);
            setNumber(e);
          }}
          placeholder="Enter mobile number"
          placeholderTextColor={"#b5b5b5"}
          editable={!disabled}
        />
      </View>
      {error && (
        <Text className="text-red-500 font-medium mt-1 text-xs px-2">
          Enter valid mobile number
        </Text>
      )}
    </View>
  );
};

export default LoginMobile;
