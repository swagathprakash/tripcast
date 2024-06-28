import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@/components/Logo'
import { useLocalSearchParams } from "expo-router";
import { Feather } from '@expo/vector-icons';

const NotificationDetails = () => {

  const { header, date, content } = useLocalSearchParams();

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this notification?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  }

  return (
    <SafeAreaView>
      <ScrollView><Logo skip={false} />
        <View className='pt-5'>
          <View className="flex-1 p-4 bg-gray-100">
            <View className="flex-row pt-2 justify-between items-center mb-4">
              <Text className="text-sm text-gray-500">{date}</Text>
              <Pressable onPress={handleDelete}>
                <Feather name="trash-2" size={24} color="red" />
              </Pressable>
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">{header}</Text>
            <Text className="text-base text-gray-700 mb-4">{content}</Text>
            <Pressable
              className="mt-auto bg-primary py-3 rounded-lg"
            >
              <Text className="text-center text-white text-lg font-semibold">
                Regenerate Trip
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationDetails