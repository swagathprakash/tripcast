import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/store";

const NotificationDetails = () => {
  const { notification_id, date } = useLocalSearchParams();
  const { notifications, loading } = useAppSelector(
    (state) => state.notification
  );
  const notification = notifications?.find((item) => {
    return item.notification_id == parseInt(notification_id as string);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Logo skip={false} />
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#1f1e1e"}
            className="my-52"
          />
        ) : (
          <View className="pt-5">
            <View className="flex-1 p-4 bg-gray-100">
              <View className="flex-row pt-2 justify-between items-center mb-4">
                <Text className="text-sm text-gray-500">{date}</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                There is some changes in the weather forecast
              </Text>
              <Text className="text-base text-gray-700 mb-4">
                {notification?.content}
              </Text>
              <Pressable className="mt-auto bg-primary py-3 rounded-lg">
                <Text className="text-center text-white text-lg font-semibold">
                  Regenerate Trip
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetails;
