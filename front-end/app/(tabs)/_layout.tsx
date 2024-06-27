import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, focused, name }: any) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          focused ? "font-semibold text-white" : "font-regular text-gray-100"
        } text-xs text-[10px]`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{ height: "100%", backgroundColor: "#f8fafc" }}
      >
        <Logo />
        <Tabs
          screenOptions={{
            // tabBarVisibilityAnimationConfig:{hide:'fade'}
            headerShown: false,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#827F75",
            tabBarStyle: {
              backgroundColor: "#161622",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 64,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="notification"
            options={{
              title: "Notification",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Notification"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default TabLayout;
