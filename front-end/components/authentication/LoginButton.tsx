import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { validateMobileNumber } from "@/libs/utils";
import axios from "axios";
import { endpoints } from "@/constants";

const getOtpUrl = endpoints.BACKEND_URL + "/get-otp";

const LoginButton = ({
  number,
  setError,
  setSignup,
}: {
  number: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOtp = async (number: string) => {
    const fetchUrl = `${getOtpUrl}?phone=${number}`;
    console.log("URLLL:", fetchUrl);
    
    const result = await axios.get(fetchUrl).catch((err) => {
      console.log(err);
    });
    // const result = await new Promise((reslove) => setTimeout(reslove, 2000));
    setIsLoading(false);
    setSignup(true);
    setIsLoading(false);
    return result;
  };

  return (
    <View>
      <TouchableOpacity
        className={`bg-white px-2 h-12 rounded-md my-5 items-center justify-center border-primary border-[1px] `}
        onPress={() => {
          const result = validateMobileNumber(number);
          !result && setError(true);
          if (result) {
            setIsLoading(true);
            getOtp(number);
          }
        }}
        activeOpacity={0.8}
        disabled={!number}
      >
        {!isLoading ? (
          <Text className={`text-primary tracking-widest text-xl font-bold`}>
            Send OTP
          </Text>
        ) : (
          <ActivityIndicator size={"small"} color={"#827F75"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
