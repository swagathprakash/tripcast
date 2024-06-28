import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { authenticateUser } from "@/store/slice/authSlice";
import { getData } from "@/libs/utils";

const CustomButton = ({
  content,
  navigator,
  childStyle,
  parentStyle,
}: {
  content: string;
  navigator?: string;
  childStyle?: string;
  parentStyle?: string;
}) => {
  const dispatch = useDispatch();

  return (
    <View>
      <TouchableOpacity
        className={`x-2 mx-auto py-2 w-[50vw] rounded-md items-center justify-center bg-white border-[1px] border-primary opacity-80 ${parentStyle}`}
        onPress={async () => {
          const phone = await getData();
          phone && dispatch(authenticateUser({ phone }) as any);
          navigator && router.push(navigator);
        }}
      >
        <Text className={`text-primary text-lg text-center font-bold ${childStyle}`}>
          {content}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
