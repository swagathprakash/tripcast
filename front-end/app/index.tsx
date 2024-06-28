import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "./../constants";
import TextCarousel from "@/components/landing_page/TextCarousel";
import Logo from "@/components/Logo";
import CustomButton from "@/components/CustomButton";

const App = () => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={images.landingPage}
          className=""
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <Logo skip={false} />
            <TextCarousel />
            <CustomButton content="Get started" navigator="/authentication" />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="white" />
    </>
  );
};

export default App;
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});
