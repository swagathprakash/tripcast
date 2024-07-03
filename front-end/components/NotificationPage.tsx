import { View, Text, Pressable, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { Ionicons } from '@expo/vector-icons';
import { endpoints, images } from "@/constants";
import { router } from "expo-router";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchNotification } from "@/store/slice/notificationSlice";
import axios from "axios";
import LoginButtonCard from "./LoginButtonCard";

const NotificationPage = () => {
  const [reload, setReload] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { notifications, loading } = useAppSelector(
    (state) => state.notification
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchNotification(user.user_id));
    }
  }, [user, reload]);

  const formatDate = (date: moment.MomentInput) => {
    const notificationDate = moment(date);
    const today = moment();
    const yesterday = moment().subtract(1, "day");

    if (notificationDate.isSame(today, "day")) {
      return notificationDate.format("h:mm A");
    } else if (notificationDate.isSame(yesterday, "day")) {
      return "Yesterday";
    } else {
      return notificationDate.format("MMMM DD, YYYY");
    }
  };

  const markAsRead = async (notification_id: number) => {
    try {
      const response = await axios.patch(
        `${endpoints.BACKEND_URL}/notifications`,
        { notification_id }
      );
      return true;
    } catch {
      console.log("Error occured");
    }
  };

  const unreadCount = notifications?.filter(
    (notification) => !notification.is_read
  ).length;
  const allRead = unreadCount == 0;
  return loading ? (
    <ActivityIndicator size={"large"} color={"#1f1e1e"} className="my-52" />
  ) : (user ?
    <View className="px-5">
      {!notifications? (
        <View className="flex h-[75vh] justify-center items-center">
          <Image
            source={images.noNotification}
            alt="No-notifications image"
            className="w-64 h-64"
          ></Image>
          <Text className="pt-24 text-2xl font-bold text-gray-600">
            No Notifications Yet
          </Text>
          <Text className="pt-2 font-semibold text-gray-400">
            You have no notifications right now.
          </Text>
          <TouchableOpacity className='items-end' onPress={() => setReload(!reload)}>
              <Ionicons name="reload" size={20} color="#1f1e1e" />
            </TouchableOpacity>
        </View>
      ) : (
        <View className="min-h-[100px]">
          <View className="px-1 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100 min-h-4">
            <Text className="text-xl font-semibold text-primary">
                  Notifications {unreadCount && `(${unreadCount})`}
            </Text>
            <TouchableOpacity className='items-end' onPress={() => setReload(!reload)}>
              <Ionicons name="reload" size={20} color="#1f1e1e" />
            </TouchableOpacity>

          </View>
          <View className="flex-col gap-2">
            {notifications?.map((item) => {
              return (
                <Pressable
                  onPress={() => {
                    markAsRead(item.notification_id);
                    router.push({
                      pathname: "/notification-details",
                      params: {
                        date: formatDate(item.created_at),
                        notification_id: item.notification_id,
                      },
                    });
                  }}
                  key={item.notification_id}
                  className="flex-1 bg-white shadow-sm shadow-gray-500 rounded-xl"
                >
                  <View className="px-3 py-4 gap-3 flex-col justify-center flex-1 flex-wrap">
                    <View className="">
                      <View className="flex-row justify-between w-full">
                        <View>
                          <Text
                            className={
                              item.is_read
                                ? "text-lg text-gray-500 font-semibold"
                                : "text-lg text-primary font-semibold"
                            }
                          >
                            Weather Changed 😶
                          </Text>
                          <Text>{item.destination}</Text>
                        </View>
                        <View className="flex-row items-center gap-2 pr-2">
                          <Text
                            className={
                              item.is_read
                                ? "text-xs text-gray-500 font-semibold"
                                : "text-xs text-primary font-semibold"
                            }
                          >
                            {formatDate(item.created_at)}
                          </Text>
                          {item.is_read ? (
                            ""
                          ) : (
                            <Octicons
                              name="dot-fill"
                              size={15}
                              color="#3b82f6"
                            />
                          )}
                        </View>
                      </View>
                      <Text
                        className={
                          item.is_read
                            ? "text-xs text-gray-400 font-medium pt-2"
                            : "text-xs text-gray-700 font-medium pt-2"
                        }
                      >
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </View> : <View className="mt-4">
      <LoginButtonCard headerText="Please login to view notifications" />
    </View>
  );
};

export default NotificationPage;
