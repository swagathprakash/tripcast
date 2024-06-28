import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { images } from "@/constants";
import { router } from "expo-router";
import moment from "moment";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      header: "Notification 1",
      date: "2024-06-27T10:00:00",
      read: false,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid velit qui doloremque dolorum! Saepe rerum architecto at velit! Dolore, deleniti rem. Voluptatem cupiditate accusantium autem similique perspiciatis laborum maxime illo.",
    },
    {
      id: 2,
      header: "Notification 2",
      read: false,
      date: "2024-06-28T10:00:00",
      content:
        "Lorem ipsum dolor sit amet, laborum maxime illo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ",
    },
    {
      id: 3,
      header: "Notification 3",
      read: true,
      date: "2024-06-28T12:00:00",
      content:
        "molestiae harum aspernatur sint enim nisi sequi ut voluptas obcaecati, suscipit deserunt ducimus velit adipisci nobis laborum fugit rerum assumenda quaerat! Quidem sunt molestiae vitae nihil.",
    },
    {
      id: 4,
      header: "Notification 4",
      read: false,
      date: "2024-06-25T10:00:00",
      content: "Lorem, ipsum.",
    },
  ]);

  useEffect(() => {
    const sortedNotifications = [...notifications].sort((a, b) => {
      if (a.read === b.read) {
        return moment(b.date).diff(moment(a.date));
      } else {
        return a.read ? 1 : -1;
      }
    });
    setNotifications(sortedNotifications);
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    const sortedNotifications = updatedNotifications.sort((a, b) => {
      if (a.read === b.read) {
        return moment(b.date).diff(moment(a.date));
      } else {
        return a.read ? 1 : -1;
      }
    });
    setNotifications(sortedNotifications);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handlePressNotification = (id: number) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    const sortedNotifications = updatedNotifications.sort((a, b) => {
      if (a.read === b.read) {
        return moment(b.date).diff(moment(a.date));
      } else {
        return a.read ? 1 : -1;
      }
    });
    setNotifications(sortedNotifications);
  };

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

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;
  const allRead = unreadCount == 0;

  return (
    <>
      {notifications.length === 0 ? (
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
          <Text className="font-semibold text-gray-400">Come back later</Text>
        </View>
      ) : (
        <View>
          <View className="px-1 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xl font-semibold text-primary">
              Notifications ({unreadCount})
            </Text>
            {!allRead && (
              <Pressable onPress={markAllAsRead}>
                <Text className="font-light text-sm tracking-tighter text-red-500">
                  Mark all as read
                </Text>
              </Pressable>
            )}
          </View>
          <View className="flex-col gap-2">
            {notifications.map((item) => {
              return (
                <Pressable
                  onPress={() => {
                    handlePressNotification(item.id);
                    router.push({
                      pathname: "/notification-details",
                      params: {
                        date: formatDate(item.date),
                        content: item.content,
                      },
                    });
                  }}
                  key={item.id}
                  className="flex-1 bg-white shadow-sm shadow-gray-500 rounded-xl"
                >
                  <View className="px-3 py-4 gap-3 flex-col justify-center flex-1 flex-wrap">
                    <View className="">
                      <View className="flex-row justify-between w-full">
                        <Text
                          className={
                            item.read
                              ? "text-lg text-gray-500 font-semibold"
                              : "text-lg text-primary font-semibold"
                          }
                        >
                          Weather Changed 😶
                        </Text>
                        <View className="flex-row items-center gap-2 pr-2">
                          <Text
                            className={
                              item.read
                                ? "text-xs text-gray-500 font-semibold"
                                : "text-xs text-primary font-semibold"
                            }
                          >
                            {formatDate(item.date)}
                          </Text>
                          {item.read ? (
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
                          item.read
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
    </>
  );
};

export default NotificationPage;
