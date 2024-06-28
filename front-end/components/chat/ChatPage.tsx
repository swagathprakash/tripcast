import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { storeData } from '@/libs/utils';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      {user ? (
        <View className="m-3 my-auto bg-white shadow-md shadow-gray-500 rounded-md ">
          <Text>
            Chat UI
          </Text>
        </View>
      ) : (
        <View className="m-3 my-auto bg-white shadow-md shadow-gray-500 rounded-md ">
          <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xs font-semibold text-gray-500">
              Please login to create itenary
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
      )}
    </>
  )
}

export default ChatPage

const styles = StyleSheet.create({})