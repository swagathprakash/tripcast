import { ScrollView, View } from "react-native";
import React, { useRef } from "react";
import ChatPage from "@/components/chat/ChatPage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Chat = () => {
  const scrollRef = useRef<any>(null);
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={(width, height) =>
          scrollRef.current.scrollTo({ y: height })
        }
      >
        <View className="pt-5 pb-10">
          <ChatPage />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Chat;
