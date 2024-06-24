import React from "react";
import { Tabs } from "expo-router";
import { Animated, Image, Text, View } from "react-native";

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
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#4a4a4a",
          tabBarStyle: {
            backgroundColor: "black",
            borderTopColor: "gray",
            borderTopWidth: 1,
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (<></>
                // <TabIcon
                //   icon={icons.home}
                //   color={color}
                //   name={"Home"}
                //   focused={focused}
                // />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
