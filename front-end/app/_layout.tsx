import React from "react";
import "../globals.css";
import { Stack } from "expo-router";

const Rootlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="select-scheme" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Rootlayout;
