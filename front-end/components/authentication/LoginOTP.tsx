import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { endpoints } from "@/constants";
import { useDispatch } from "react-redux";
import { authenticateUser } from "@/store/slice/authSlice";

const verifyOtpUrl = endpoints.BACKEND_URL + "/verify-otp";

const LoginOTP = ({
  setNewUser,
  number,
  otp,
  setOtp,
}: {
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  otp: string;
  number: string;
}) => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    const { data }: any = await axios
      .post(verifyOtpUrl, { otp: parseInt(otp), phone: number })

      .catch((err) => {
        console.log(err);
      });
    if (data?.data?.verified == false) {
      setError(true);
      return;
    }
    if (data?.data?.user_present) {
      dispatch(authenticateUser({ phone: number }));
      setIsLoading(false);
      return;
    }
    setNewUser(true);
    setIsLoading(false);
    return data;
  };

  const verifyOtpTemp = (otp: string) => {
    if (otp === "6969") {
      setNewUser(true);
    } else {
      setError(true);
    }
  };

  return (
    <View>
      <View
        className={`bg-white flex-row items-center text-center px-2 h-12 mt-5 rounded-md border-primary border-[1px] ${
          error && "border-[1px] border-red-500"
        } `}
      >
        <TextInput
          keyboardType="numeric"
          className={`font-medium px-3 text-center w-full text-base duration-500 text-primary    ${
            otp && " text-2xl px-2 tracking-[20px]"
          } ${error && "text-red-500"}`}
          value={otp}
          onChangeText={(e: any) => {
            setError(false);
            e.length < 5 && setOtp(e);
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
          className={`bg-white px-2 py-2 rounded-md my-5 items-center justify-center border-[1px] border-primary `}
          onPress={() => {
            if (otp.length !== 4) {
              setError(true);
            } else {
              verifyOtp(otp);
            }
          }}
          activeOpacity={0.8}
          disabled={otp.length < 1}
        >
          {!isLoading ? (
            <Text className={`text-primary tracking-widest text-xl font-bold`}>
              Verify
            </Text>
          ) : (
            <ActivityIndicator size={"small"} color={"#827F75"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginOTP;
