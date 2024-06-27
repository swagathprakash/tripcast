import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";

const profile = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50 py-5">
      <ProfilePage />
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({});
