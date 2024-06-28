import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotificationPage from "@/components/NotificationPage";


const notification = () => {
  return (
    <ScrollView className="bg-[#f8fafc]">
      <View className="w-full px-5 justify-start h-full">
        <NotificationPage />
      </View>
    </ScrollView>
  );
};

export default notification;

const styles = StyleSheet.create({});
