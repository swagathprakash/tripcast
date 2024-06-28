import { ScrollView } from 'react-native'
import React from 'react'
import ChatPage from '@/components/chat/ChatPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 bg-slate-50 py-5">
        <ChatPage />
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default Chat
