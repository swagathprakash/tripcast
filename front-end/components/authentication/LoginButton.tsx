import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { validateMobileNumber } from "@/libs/utils";

const LoginButton = ({
  number,
  setError,
  setSignup,
}: {
  number: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View>
      <TouchableOpacity
        className={`bg-white px-2 py-2 rounded-md my-5 items-center justify-center `}
        onPress={() => {
          const result = validateMobileNumber(number);
          !result && setError(true);
          result && setSignup(true);
        }}
        activeOpacity={0.8}
        disabled={!number}
      >
        <Text className={`text-black tracking-widest text-2xl font-bold`}>
          GET OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
