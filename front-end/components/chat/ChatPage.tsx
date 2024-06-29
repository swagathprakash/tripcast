import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { storeData } from '@/libs/utils';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';
import ChatFlow from './ChatFlow';
import LoginButtonCard from '../LoginButtonCard';

const ChatPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {user ? (
        <ChatFlow />
      ) : (
        <View className='my-10'>
          <LoginButtonCard headerText='Please login to create itenary'/>
        </View>
      )}
    </>
  )
}

export default ChatPage

const styles = StyleSheet.create({})