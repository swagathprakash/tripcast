import { View, Text } from "react-native";
import React, { useState } from "react";
import LoginMobile from "./LoginMobile";
import LoginButton from "./LoginButton";
import LoginOTP from "./LoginOTP";
import SignupCard from "./SignupCard";

const SignIn = () => {
  const [number, setNumber] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [signup, setSignup] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);

  return !newUser ? (
    <View className="flex-1  items-center justify-center rounded-md ">
      <View className="justify-center items-center mt-2 pb-10">
        <Text className="text-primary text-3xl font-bold mb-2 tracking-[5px]">
          Welcome
        </Text>
        <Text className="text-primary font-semibold text-xs mt-2">
          Sign in to your account using your phone number.
        </Text>
      </View>
      <View className="w-full px-5 pb-10">
        <LoginMobile
          error={error}
          setError={setError}
          number={number}
          setNumber={setNumber}
          disabled={signup}
        />
        {signup && (
          <LoginOTP
            otp={otp}
            setOtp={setOtp}
            number={number}
            setNewUser={setNewUser}
          />
        )}
        {!signup && (
          <LoginButton
            number={number}
            setError={setError}
            setSignup={setSignup}
          />
        )}
      </View>
    </View>
  ) : (
    <SignupCard number={number} otp={otp} />
  );
};

export default SignIn;
