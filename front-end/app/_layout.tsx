import React from "react";
import "../globals.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/store/store";

const Rootlayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="authentication" options={{ headerShown: false }} />
        <Stack.Screen
          name="location-details"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="itenary-day"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="itenary-details"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat-ui"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="coming-soon"
          options={{ headerShown: false }}
        />
      </Stack>
    </Provider>
  );
};

export default Rootlayout;
