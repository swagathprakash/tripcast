import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import Octicons from '@expo/vector-icons/Octicons';
import { images } from "@/constants";
import { router } from "expo-router";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      header: "Notification 1",
      date: "July 04,2023",
      read: false,
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid velit qui doloremque dolorum! Saepe rerum architecto at velit! Dolore, deleniti rem. Voluptatem cupiditate accusantium autem similique perspiciatis laborum maxime illo."
    },
    {
      id: 2,
      header: "Notification 2",
      read: false,
      date: "July 04,2023",
      content: "Lorem ipsum dolor sit amet, laborum maxime illo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid "
    },
    {
      id: 3,
      header: "Notification 3",
      read: true,
      date: "July 04,2023",
      content: "molestiae harum aspernatur sint enim nisi sequi ut voluptas obcaecati, suscipit deserunt ducimus velit adipisci nobis laborum fugit rerum assumenda quaerat! Quidem sunt molestiae vitae nihil."
    },
    {
      id: 4,
      header: "Notification 4",
      read: false,
      date: "July 14,2023",
      content: "Lorem, ipsum."
    },
  ]);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handlePressNotification = (id: number) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;
  const allRead = (unreadCount == 0);


  return (
    <>
      {notifications.length === 0 ? (
        <View className="flex h-[75vh] justify-center items-center">
          <Image
            source={images.noNotification}
            alt="No-notifications image"
            className="w-64 h-64"
          ></Image>
          <Text className="pt-24 text-2xl font-bold text-gray-600">No Notifications Yet</Text>
          <Text className="pt-2 font-semibold text-gray-400">You have no notifications right now.</Text>
          <Text className="font-semibold text-gray-400">Come back later</Text>
        </View>
      ) : (
        <View>
          <View className="px-1 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xl font-semibold text-primary">
              Notifications ({unreadCount})
            </Text>
            {
              allRead ? <Pressable onPress={clearAllNotifications}>
                <Text className="font-light text-sm tracking-tighter text-red-500">
                  Clear All
                </Text>
              </Pressable> :
                <Pressable onPress={markAllAsRead}>
                  <Text className="font-light text-sm tracking-tighter text-red-500">
                    Mark all as read
                  </Text>
                </Pressable>
            }
          </View>
          <View className="flex-col gap-2">
            {notifications.map((item) => {
              return (
                <Pressable onPress={() => {handlePressNotification(item.id);
                  router.push({
                  pathname: "/notification-details",
                  params: {
                    header: item.header,
                    date: item.date,
                    content: item.content
                  },
                });}}  key={item.id} className="flex-1 bg-white shadow-sm shadow-gray-500 rounded-xl">
                    <View className="px-3 py-4 gap-3 flex-col justify-center flex-1 flex-wrap">
                      <View className="">
                        <View className="flex-row justify-between w-full">
                          <Text className={item.read ? "text-lg text-gray-500 font-semibold" : "text-lg text-primary font-semibold"}>
                            {item.header}
                          </Text>
                          <View className="flex-row items-center gap-2 pr-2">
                            <Text className={item.read ? "text-xs text-gray-500 font-semibold" : "text-xs text-primary font-semibold"}>
                              {item.date}
                            </Text>
                            {item.read ? '' : <Octicons name="dot-fill" size={15} color="#3b82f6" />}
                          </View>
                        </View>
                        <Text className={item.read ? "text-xs text-gray-400 font-medium pt-2" : "text-xs text-gray-700 font-medium pt-2"}>
                          {item.content}
                        </Text>
                      </View>
                    </View>
                </Pressable>
              );
            })}
          </View>

        </View>)}
    </>
  );
};


export default NotificationPage;