import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { images } from "./../constants"
import TextCarousel from "@/components/landing_page/TextCarousel";
import Logo from "@/components/Logo";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <ImageBackground
      source={images.landingPage}
      className="w-[100vw] overflow-hidden flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <Logo />
          <TextCarousel />
          <CustomButton content="Get started" navigator="/authentication" />
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  }
})