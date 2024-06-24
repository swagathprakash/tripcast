import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";

const LoginOTP = ({
  setNewUser,
}: {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [otp, setOtp] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  const validateOtp = (otp: string) => {
    return otp === "4567";
  };

  return (
    <View>
      <View
        className={`bg-white flex-row items-center text-center px-2 h-12 mt-5 rounded-md  ${
          error && "border-[1px] border-red-500"
        } `}
      >
        <TextInput
          keyboardType="numeric"
          className={`font-medium px-3 text-center w-full text-base duration-500 text-black   ${
            otp && " text-2xl px-2 tracking-[20]"
          } ${error && "text-red-500"}`}
          value={otp}
          onChangeText={(e: any) => {
            setError(false);
            e.length < 5 && setOtp(e);
            // e.length == 4 && Keyboard.dismiss();
          }}
          placeholder="Enter OTP"
          placeholderTextColor={"#b5b5b5"}
        />
      </View>
      {error && (
        <Text className="text-red-500 font-medium mt-1 text-xs px-2">
          Invalid OTP
        </Text>
      )}
      <View>
        <TouchableOpacity
          className={`bg-white px-2 py-2 rounded-md my-5 items-center justify-center `}
          onPress={() => {
            //validate otp here
            //   const result = validateMobileNumber(number);
            const result = validateOtp(otp as string);
            !result && setError(true);
            result && setNewUser(true);
          }}
          activeOpacity={0.8}
          disabled={!otp}
        >
          <Text className={`text-black tracking-widest text-2xl font-bold`}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginOTP;
