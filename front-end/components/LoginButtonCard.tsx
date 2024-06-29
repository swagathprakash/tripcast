import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { storeData } from '@/libs/utils';
import { useAppDispatch } from '@/store';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';

const LoginButtonCard = ({headerText}:{headerText:string}) => {
    const dispatch=useAppDispatch()
  return (
    <View className="m-3 bg-white shadow-md shadow-gray-500 rounded-md ">
    <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
      <Text className="text-xs font-semibold text-gray-500">
       {headerText}
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
  )
}

export default LoginButtonCard